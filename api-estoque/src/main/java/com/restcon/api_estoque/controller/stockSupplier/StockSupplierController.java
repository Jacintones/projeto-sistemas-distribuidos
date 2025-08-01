package com.restcon.api_estoque.controller.stockSupplier;

import com.restcon.api_estoque.entity.StockSupplier;
import com.restcon.api_estoque.service.StockSupplierService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/fornecedor")
public class StockSupplierController {
    private final StockSupplierService stockSupplierService;

    public StockSupplierController(StockSupplierService stockSupplierService) {
        this.stockSupplierService = stockSupplierService;
    }

    @PostMapping
    public ResponseEntity<StockSupplier> createSupplier(@RequestBody @Valid CreateSupplierDTO createSupplierDTO) {
        var supplier_id = stockSupplierService.createSupplier(createSupplierDTO);

        return ResponseEntity.created(URI.create("/fornecedor/id="+supplier_id)).build();
    }

    @GetMapping
    public ResponseEntity<List<StockSupplier>> getAllSuppliers() {
        var suppliers = stockSupplierService.getAllSuppliers();

        return ResponseEntity.ok(suppliers);
    }

    @GetMapping("/id={supplierID}")
    public ResponseEntity<StockSupplier> getSupplierByID(@PathVariable("supplierID") long supplierID) {
        var supplier = stockSupplierService.getSupplierByID(supplierID);

        return ResponseEntity.ok(supplier);
    }

    @PutMapping("/id={supplierID}")
    public ResponseEntity<StockSupplier> updateSupplier(@PathVariable("supplierID") long supplierID,
                                                        @RequestBody @Valid UpdateSupplierDTO updateSupplierDTO) {
        stockSupplierService.updateSupplier(supplierID, updateSupplierDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id={supplierID}")
    public ResponseEntity<StockSupplier> deleteSupplier(@PathVariable("supplierID") long supplierID) {
        stockSupplierService.deleteSupplier(supplierID);
        return ResponseEntity.noContent().build();
    }
}
