package com.example.main.service;

import com.example.main.model.Mesa;
import com.example.main.repository.MesaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<Mesa> mesaExistente = mesaRepository.findById(id);

        if (mesaExistente.isPresent()) {
            Mesa mesaAtualizada = mesaExistente.get();
            mesaAtualizada.setOcupada(mesa.isOcupada());
            return mesaRepository.save(mesaAtualizada);
        } else {
            throw new RuntimeException("Mesa não encontrada");
        }
    }

    public Mesa atualizarMesa(Long id, Mesa mesa) {
        Optional<Mesa> mesaExistente = mesaRepository.findById(id);

        if (mesaExistente.isPresent()) {
            Mesa mesaAtualizada = mesaExistente.get();
            mesaAtualizada.setNumero(mesa.getNumero());
            mesaAtualizada.setOcupada(mesa.isOcupada());
            mesaAtualizada.setAssentos(mesa.getAssentos());
            return mesaRepository.save(mesaAtualizada);
        } else {
            throw new RuntimeException("Mesa não encontrada");
        }
    }
}
