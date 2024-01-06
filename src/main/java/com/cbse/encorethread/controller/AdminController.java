package com.cbse.encorethread.controller;

import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/products")
    public Products addProduct(@RequestBody Products product) {
        return adminService.addProduct(product);
    }

    @PutMapping("/products/{id}")
    public Products updateProduct(@PathVariable Integer id, @RequestBody Products product) {
        return adminService.updateProduct(id, product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        adminService.deleteProduct(id);
    }

    @PutMapping("/products/quantity/{id}")
    public ResponseEntity<?> updateProductQuantity(@PathVariable Integer id, @RequestParam Integer quantityChange) {
        try {
            int updatedQuantity = adminService.updateProductQuantity(id, quantityChange);
            return ResponseEntity.ok(updatedQuantity);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
