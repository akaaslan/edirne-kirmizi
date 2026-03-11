# Category Implementation Guide

Apply these changes to your backend to add category support:

---

## 1. Update Product.java Entity

Add this field after the `title` field:

```java
@Column(nullable = false)
private String category = "Genel"; // Default category
```

**Full updated Product.java:**

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

    @Column(nullable = false)
    private String category = "Genel"; // NEW FIELD

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String price;

    private String imageUrl;

    private String trendyolUrl;

    private Boolean inStock = true;

    @Column(nullable = false)
    private Integer stockCount = 0;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        ensureImageUrl();
        updateInStockStatus();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        ensureImageUrl();
        updateInStockStatus();
    }

    private void ensureImageUrl() {
        if ((imageUrl == null || imageUrl.isEmpty()) && images != null && !images.isEmpty()) {
            imageUrl = images.get(0);
        }
    }

    private void updateInStockStatus() {
        this.inStock = this.stockCount > 0;
    }
}
```

---

## 2. Update ProductDTO.java

Add category field after title:

```java
package com.edirnekirmizisi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private String category; // NEW FIELD
    private String description;
    private String price;
    private String imageUrl;
    private String trendyolUrl;
    private Boolean inStock;
    private Integer stockCount;
    private List<String> images = new ArrayList<>();
}
```

---

## 3. Update ProductService.java

Add category handling in updateProduct method:

```java
public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

    product.setTitle(productDTO.getTitle());
    product.setCategory(productDTO.getCategory()); // NEW LINE
    product.setDescription(productDTO.getDescription());
    product.setPrice(productDTO.getPrice());
    product.setImageUrl(productDTO.getImageUrl());
    product.setTrendyolUrl(productDTO.getTrendyolUrl());
    product.setStockCount(productDTO.getStockCount());

    if (productDTO.getImages() != null) {
        product.setImages(productDTO.getImages());
    }

    Product updatedProduct = productRepository.save(product);
    return modelMapper.map(updatedProduct, ProductDTO.class);
}
```

---

## 4. Add Category Filter Endpoint to ProductController.java

Add this new endpoint to get products by category:

```java
@GetMapping("/category/{category}")
public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable String category) {
    return ResponseEntity.ok(productService.getProductsByCategory(category));
}

@GetMapping("/categories")
public ResponseEntity<List<String>> getAllCategories() {
    return ResponseEntity.ok(productService.getAllCategories());
}
```

---

## 5. Add Methods to ProductService.java

```java
public List<ProductDTO> getProductsByCategory(String category) {
    return productRepository.findByCategory(category).stream()
            .map(product -> modelMapper.map(product, ProductDTO.class))
            .collect(Collectors.toList());
}

public List<String> getAllCategories() {
    return productRepository.findAll().stream()
            .map(Product::getCategory)
            .distinct()
            .sorted()
            .collect(Collectors.toList());
}
```

---

## 6. Add Method to ProductRepository.java

```java
package com.edirnekirmizisi.repository;

import com.edirnekirmizisi.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category); // NEW METHOD
}
```

---

## Suggested Categories

Here are some Turkish category names you might want to use:

- **Genel** (General)
- **Reçel & Marmelat** (Jam & Marmalade)
- **Turşu** (Pickles)
- **Salça** (Paste)
- **Şurup** (Syrup)
- **Konserve** (Canned)
- **Lokum** (Turkish Delight)
- **Baharat** (Spices)
- **Çay & Kahve** (Tea & Coffee)
- **Tatlı** (Desserts)
- **Zeytinyağlı** (Olive Oil Products)

---

## Database Migration

Since you're using `spring.jpa.hibernate.ddl-auto=update`, the category column will be automatically added when you restart the backend.

If you have existing products without categories, they will automatically get "Genel" as the default value.

---

## Testing

After implementing these changes:

1. Restart your Spring Boot backend
2. Check database - you should see a new `category` column in the `products` table
3. Test endpoints:
   - Create product with category
   - Get all categories: `GET /api/products/categories`
   - Filter by category: `GET /api/products/category/Reçel & Marmelat`
