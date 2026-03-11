# 🛠️ Edirne Kırmızısı - Developer Documentation

## Project Overview

Full-stack e-commerce platform built with:
- **Frontend:** React 18.2 + Vite + React Router
- **Backend:** Spring Boot 3.x + PostgreSQL
- **Authentication:** JWT tokens
- **Payment:** Mock (ready for Iyzico/PayTR integration)

---

## 🏗️ Architecture

### Frontend Architecture

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin panel components
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ...
├── context/            # React Context providers
│   └── CartContext.jsx
├── pages/              # Route pages
├── services/           # API service layer
│   └── api.js
├── styles/             # CSS modules
└── data/              # Static data
```

**State Management:**
- Context API for cart management
- Local storage persistence
- No external state library (Redux-free)

**Routing:**
- React Router v7
- Protected routes for admin
- Dynamic product routes
- 404 handling

### Backend Architecture

```
src/main/java/com/edirnekirmizisi/
├── config/             # Configuration classes
│   ├── CorsConfig.java
│   ├── SecurityConfig.java
│   └── FileUploadConfig.java
├── controller/         # REST controllers
├── dto/               # Data Transfer Objects
├── entity/            # JPA entities
├── repository/        # Spring Data repositories
├── security/          # JWT & security
└── service/           # Business logic
```

**Design Patterns:**
- **Repository Pattern** - Data access
- **Service Layer** - Business logic
- **DTO Pattern** - API contracts
- **Dependency Injection** - Spring beans

---

## 🔧 Setup & Installation

### Prerequisites

- **Node.js** 18+ and npm
- **Java** 17+
- **PostgreSQL** 14+
- **Maven** 3.8+
- **Git**

### Frontend Setup

```bash
cd edirne-kirmizisi
npm install
npm run dev
```

**Environment Variables:**
Create `.env`:
```env
VITE_API_URL=http://localhost:8080/api
VITE_UPLOAD_URL=http://localhost:8080/uploads
```

### Backend Setup

1. **Create Database:**
```sql
CREATE DATABASE edirne_db;
CREATE USER postgres WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE edirne_db TO postgres;
```

2. **Configure Application:**
Edit `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/edirne_db
spring.datasource.username=postgres
spring.datasource.password=1234

jwt.secret=your-very-long-secret-key-change-this
jwt.expiration=86400000

spring.mail.host=smtp.gmail.com
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

3. **Run Application:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Or use IDE (IntelliJ IDEA, Eclipse):
- Import as Maven project
- Run `EdirneKirmizisiBackendApplication.java`

### Database Migration

**Auto-migration enabled:**
```properties
spring.jpa.hibernate.ddl-auto=update
```

For production, use Flyway or Liquibase:
```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
```

---

## 📝 Code Standards

### Java Conventions

**Naming:**
- Classes: `PascalCase`
- Methods: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Packages: `lowercase`

**Annotations:**
```java
@Entity
@Table(name = "products")
@Data  // Lombok
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
}
```

**REST Controller Pattern:**
```java
@RestController
@RequestMapping("/api/resource")
@RequiredArgsConstructor
public class ResourceController {
    
    private final ResourceService service;
    
    @GetMapping
    public ResponseEntity<List<Resource>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody ResourceDTO dto) {
        try {
            return ResponseEntity.ok(service.create(dto));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }
}
```

### JavaScript/React Conventions

**Component Structure:**
```jsx
import React, { useState, useEffect } from 'react';
import './Component.css';

export default function Component({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  const handleAction = () => {
    // Handler logic
  };
  
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
}
```

**API Calls:**
```javascript
// services/api.js
export const apiService = {
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
  
  async createProduct(data) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

---

## 🔐 Authentication Flow

### JWT Implementation

**Login Process:**
1. User submits credentials
2. Backend validates and generates JWT
3. Token returned to frontend
4. Frontend stores in localStorage
5. Token included in subsequent requests

**Token Structure:**
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "username",
    "role": "USER",
    "iat": 1706083200,
    "exp": 1706169600
  }
}
```

**Protected Route Example:**
```jsx
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/giris" />;
  }
  
  return children;
}
```

**Backend Security:**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

---

## 📡 API Integration

### Frontend API Service

**Base Configuration:**
```javascript
// services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const api = {
  get: (endpoint) => 
    fetch(`${API_URL}${endpoint}`, { headers: getHeaders() })
      .then(res => res.json()),
      
  post: (endpoint, data) =>
    fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }).then(res => res.json()),
    
  // ... put, patch, delete
};
```

**Usage in Components:**
```jsx
import { api } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    api.get('/products')
      .then(setProducts)
      .catch(console.error);
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Error Handling

**Global Error Handler:**
```javascript
// utils/errorHandler.js
export function handleApiError(error) {
  if (error.response?.status === 401) {
    // Unauthorized - redirect to login
    localStorage.removeItem('token');
    window.location.href = '/giris';
  } else if (error.response?.status === 403) {
    // Forbidden
    alert('You do not have permission');
  } else {
    // General error
    console.error('API Error:', error);
    alert('An error occurred. Please try again.');
  }
}
```

---

## 🗄️ Database Schema

### Core Tables

**users:**
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**products:**
```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    price VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    trendyol_url VARCHAR(500),
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    stock_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE product_images (
    product_id BIGINT NOT NULL,
    image_url VARCHAR(500),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

**orders:**
```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    total_amount DOUBLE PRECISION,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(50) DEFAULT 'mock',
    notes TEXT,
    created_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase DOUBLE PRECISION,
    product_name VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Indexes

**Performance Optimization:**
```sql
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_stock ON products(in_stock, stock_count);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_reviews_product ON product_reviews(product_id, approved);
```

---

## 🧪 Testing

### Backend Testing

**Unit Tests:**
```java
@SpringBootTest
class ProductServiceTest {
    
    @Autowired
    private ProductService productService;
    
    @MockBean
    private ProductRepository productRepository;
    
    @Test
    void testCreateProduct() {
        // Arrange
        ProductDTO dto = new ProductDTO();
        dto.setTitle("Test Product");
        
        // Act
        Product result = productService.createProduct(dto);
        
        // Assert
        assertNotNull(result.getId());
        assertEquals("Test Product", result.getTitle());
    }
}
```

**Integration Tests:**
```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ProductControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testGetProducts() {
        ResponseEntity<Product[]> response = 
            restTemplate.getForEntity("/api/products", Product[].class);
            
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
```

### Frontend Testing

**Component Tests (Vitest + React Testing Library):**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('renders product information', () => {
    const product = {
      id: 1,
      title: 'Test Product',
      price: '100',
      imageUrl: 'test.jpg'
    };
    
    render(<ProductCard product={product} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100 TL')).toBeInTheDocument();
  });
  
  it('calls onAddToCart when button clicked', () => {
    const onAddToCart = vi.fn();
    const product = { id: 1, title: 'Test' };
    
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);
    
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});
```

---

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

**Build:**
```bash
npm run build
```

**Netlify Configuration:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Environment Variables:**
- `VITE_API_URL` - Production API URL

### Backend Deployment

**Docker:**
```dockerfile
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: edirne_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/edirne_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - postgres

volumes:
  postgres_data:
```

**Cloud Deployment (AWS/Azure):**
1. Create RDS PostgreSQL instance
2. Deploy Spring Boot as:
   - Elastic Beanstalk
   - ECS container
   - EC2 instance
3. Configure security groups
4. Set environment variables
5. Enable auto-scaling

---

## 🔧 Development Tools

### Recommended IDE Setup

**VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Path Intellisense

**IntelliJ IDEA Plugins:**
- Lombok
- Spring Boot Assistant
- Database Navigator
- GitToolBox

### Code Quality Tools

**ESLint Configuration:**
```json
{
  "extends": ["react-app", "prettier"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "off"
  }
}
```

**Prettier:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## 📚 Additional Resources

### Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

### Community
- GitHub Issues
- Stack Overflow
- Discord Server (coming soon)

### Training
- Video Tutorials (YouTube)
- Blog Posts
- Code Examples Repository

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 📄 License

This project is proprietary software. All rights reserved.

---

**Questions?** Contact: dev@edirnekirmizisi.com
