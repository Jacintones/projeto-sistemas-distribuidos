package com.restcon.api_cozinhas.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class KitchenNotFound extends RuntimeException{

    public KitchenNotFound() {
        super("Cozinha não encontrada.");
    }

}
