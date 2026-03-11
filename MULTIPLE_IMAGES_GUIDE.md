# Multiple Images & Product ID Management

## Part 1: Backend - Multiple Images Support

### 1. Update Product.java (entity)

```java
package com.edirnekirmizisi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String price;
    
    private String imageUrl;  // Main/primary image
    
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();  // Additional images
    
    private String trendyolUrl;
    
    private Boolean inStock = true;
    
    @Column(nullable = false)
    private Integer stockCount = 0;
    
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        updateInStockStatus();
        
        // If images list has items but imageUrl is null, set first image as primary
        if ((imageUrl == null || imageUrl.isEmpty()) && !images.isEmpty()) {
            imageUrl = images.get(0);
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        updateInStockStatus();
    }
    
    private void updateInStockStatus() {
        this.inStock = this.stockCount > 0;
    }
    
    // Helper method to add image
    public void addImage(String imageUrl) {
        if (this.images == null) {
            this.images = new ArrayList<>();
        }
        if (!this.images.contains(imageUrl)) {
            this.images.add(imageUrl);
        }
        
        // Set as primary if no primary exists
        if (this.imageUrl == null || this.imageUrl.isEmpty()) {
            this.imageUrl = imageUrl;
        }
    }
}
```

---

### 2. Update ProductDTO.java (dto)

```java
package com.edirnekirmizisi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private String price;
    private String imageUrl;  // Primary image
    private List<String> images = new ArrayList<>();  // All images
    private String trendyolUrl;
    private Boolean inStock;
    private Integer stockCount;
}
```

---

### 3. Update FileUploadController.java - Add Multiple Upload

```java
package com.edirnekirmizisi.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

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
            String imageUrl = saveFile(file);
            
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            response.put("imageUrl", imageUrl);
            response.put("filename", extractFilename(imageUrl));

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }
    
    // NEW: Multiple image upload
    @PostMapping("/images")
    public ResponseEntity<?> uploadMultipleImages(@RequestParam("files") MultipartFile[] files) {
        if (files.length == 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please select files"));
        }

        try {
            List<String> imageUrls = new ArrayList<>();
            
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String imageUrl = saveFile(file);
                    imageUrls.add(imageUrl);
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("urls", imageUrls);
            response.put("imageUrls", imageUrls);
            response.put("count", imageUrls.size());

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to upload files: " + e.getMessage()));
        }
    }
    
    // Helper method to save file
    private String saveFile(MultipartFile file) throws IOException {
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
        return "http://localhost:" + serverPort + "/uploads/" + newFilename;
    }
    
    private String extractFilename(String url) {
        return url.substring(url.lastIndexOf("/") + 1);
    }
}
```

---

## Part 2: About Product IDs (Important!)

### ⚠️ Why ID Gaps Are GOOD (Recommended Approach):

**Standard Database Practice:**
- IDs: 1, 2, 3, 5, 7, 10 (after deleting 4, 6, 8, 9)
- ✅ Maintains data integrity
- ✅ Easier debugging and audit trails
- ✅ Prevents confusion
- ✅ Standard in all major applications

**Problems with Reusing IDs:**
- ❌ Can break foreign key relationships
- ❌ Confuses audit logs
- ❌ Makes debugging harder
- ❌ Can cause race conditions
- ❌ Goes against database best practices

### If You REALLY Want Sequential IDs (Not Recommended):

You'd need a custom ID generator, but honestly, **don't do this**. Even Amazon, eBay, Google don't reuse IDs.

**Better Alternative:** Display products by a different field like `displayOrder` or just let IDs be IDs.

---

## Part 3: Frontend Updates Coming Next

I'll update the frontend to:
1. ✅ Upload multiple images
2. ✅ Show image thumbnails in product cards
3. ✅ Image carousel/gallery in product detail
4. ✅ Manage multiple images in admin panel
