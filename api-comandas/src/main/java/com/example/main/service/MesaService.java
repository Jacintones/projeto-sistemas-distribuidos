package com.example.main.service;

import com.example.main.model.Mesa;
import com.example.main.repository.MesaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesaService {

    private final MesaRepository mesaRepository;

    public MesaService(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    public Mesa criarMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public List<Mesa> obterTodasAsMesas() {
        return mesaRepository.findAll();
    }

    public Mesa alterarStatusMesa(Long id, Mesa mesa) {
        Mesa mesaExistente = mesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa não encontrada"));

        mesaExistente.setOcupada(mesa.isOcupada());
        return mesaRepository.save(mesaExistente);
    }
}
