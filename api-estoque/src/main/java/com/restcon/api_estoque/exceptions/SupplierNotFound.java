package com.restcon.api_estoque.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SupplierNotFound extends RuntimeException {
    public SupplierNotFound(String message) {
        super(message);
    }
}
