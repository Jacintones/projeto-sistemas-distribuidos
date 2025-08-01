package com.restcon.api_estoque;

import org.springframework.boot.SpringApplication;

public class TestApiEstoqueApplication {

	public static void main(String[] args) {
		SpringApplication.from(ApiEstoqueApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
