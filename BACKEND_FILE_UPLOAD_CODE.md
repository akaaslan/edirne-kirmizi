# Backend File Upload - Implementation & Testing Guide

## Quick Setup

Add these 2 files to your Spring Boot backend + update SecurityConfig:

## 1. FileUploadController.java (controller)

```java
package com.edirnekirmizisi.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

    @Value("${server.port:8080}")
    private String serverPort;

    @PostMapping("/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please select a file"));
        }

        try {
            // Create uploads directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = uploadPath.resolve(newFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return URL
            String fileUrl = "http://localhost:" + serverPort + "/uploads/" + newFilename;
            
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("imageUrl", fileUrl);
            response.put("filename", newFilename);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }
}
```

---

## 2. FileUploadConfig.java (config)

```java
package com.edirnekirmizisi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileUploadConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded files statically
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir + "/");
    }
}
```

---

## 3. Update SecurityConfig.java

Add `/uploads/**` to permitted URLs:

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/products/**").permitAll()
            .requestMatchers("/api/contact/**").permitAll()
            .requestMatchers("/api/blog/**").permitAll()
            .requestMatchers("/uploads/**").permitAll()  // ADD THIS LINE
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
}
```

---

## 4. application.properties (already configured)

These settings are already in your application.properties:

```properties
# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
file.upload-dir=./uploads
```

---

## Setup Steps:

1. **Create the 2 files above** in your IntelliJ backend
2. **Update SecurityConfig** - add `/uploads/**` to permitAll
3. **Restart Spring Boot**
4. **Done!** Images upload to `./uploads/` folder

---

## 🧪 Testing Endpoints

### **1. Test Upload via Postman/Insomnia:**

**Endpoint:** `POST http://localhost:8080/api/upload/image`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

**Body:** (form-data)
```
key: file
type: File
value: [select any image file]
```

**Success Response:**
```json
{
  "url": "http://localhost:8080/uploads/abc123-def456.jpg",
  "imageUrl": "http://localhost:8080/uploads/abc123-def456.jpg",
  "filename": "abc123-def456.jpg"
}
```

**Error Response:**
```json
{
  "error": "Please select a file"
}
```

---

### **2. Test via Admin Panel (Recommended):**

1. Login: `http://localhost:5173/admin/login`
2. Click **"➕ Yeni Ürün"**
3. Click **"Choose File"** under "Ürün Resmi"
4. Select an image
5. Upload happens automatically
6. Image URL appears in the product

---

### **3. Test Upload via cURL:**

```bash
curl -X POST http://localhost:8080/api/upload/image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

---

### **4. Verify Uploaded Image:**

After upload, access the image directly:
```
http://localhost:8080/uploads/abc123-def456.jpg
```

Should display the image in browser.

---

## 📝 Complete API Endpoints Summary

### **Authentication:**
- `POST /api/auth/login` - Login (public)
- `POST /api/auth/create-admin` - Create admin user (public, remove after first use)

### **Products:**
- `GET /api/products` - Get all products (public)
- `GET /api/products/{id}` - Get single product (public)
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/{id}` - Update product (auth required)
- `DELETE /api/products/{id}` - Delete product (auth required)

### **Stock Management:**
- `PATCH /api/products/{id}/stock?stockCount={count}` - Set stock (auth required)
- `PATCH /api/products/{id}/stock/decrease?quantity={qty}` - Decrease stock (auth required)
- `PATCH /api/products/{id}/stock/increase?quantity={qty}` - Increase stock (auth required)

### **Contact:**
- `POST /api/contact/send` - Send contact message (public)

### **File Upload:**
- `POST /api/upload/image` - Upload product image (auth required)

### **Static Files:**
- `GET /uploads/{filename}` - Access uploaded images (public)

---

## 🔍 About Swagger/OpenAPI

**You asked: "Why didn't we use Swagger?"**

### We actually included it in dependencies! 

Remember this in the dependencies I provided:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

### **To Access Swagger UI:**

Once your Spring Boot app is running, go to:
```
http://localhost:8080/swagger-ui.html
```

or

```
http://localhost:8080/swagger-ui/index.html
```

### **Swagger Features:**
- ✅ Interactive API documentation
- ✅ Test endpoints directly in browser
- ✅ No need for Postman
- ✅ Auto-generated from your code
- ✅ Shows request/response examples

### **To Customize Swagger:**

Create `OpenApiConfig.java`:

```java
package com.edirnekirmizisi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Edirne Kırmızısı API")
                        .version("1.0")
                        .description("E-commerce backend API for Edirne Kırmızısı products"));
    }
}
```

### **Why Swagger is Awesome:**
- 🚀 Faster testing than Postman
- 📚 Built-in documentation
- 🔐 Can test with JWT auth
- 🎨 Nice UI for exploring APIs
- 🤝 Perfect for sharing with frontend devs

---

## 🎯 Quick Test Workflow

1. **Start backend:** Run `BackendApplication.java`
2. **Open Swagger:** `http://localhost:8080/swagger-ui.html`
3. **Login via Swagger:** Use `/api/auth/login` endpoint
4. **Copy JWT token** from response
5. **Click "Authorize" button** (🔓 top right)
6. **Paste token:** `Bearer YOUR_TOKEN`
7. **Test all endpoints!** No Postman needed!

---

## Troubleshooting

**Upload fails?**
- Check `./uploads/` folder exists and is writable
- Verify file size < 10MB
- Check JWT token is valid

**Can't access uploaded images?**
- Verify SecurityConfig has `/uploads/**` in permitAll
- Check file exists in `./uploads/` folder
- Try restarting Spring Boot

**Swagger not working?**
- Check dependency is in pom.xml
- Restart Spring Boot
- Try: `http://localhost:8080/swagger-ui/index.html`
