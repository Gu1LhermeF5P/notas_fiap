//RM557648 Guilherme Francisco
//RM555136 Larissa de Freitas

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  // Definindo estados
  const [gfNota1, setGfNota1] = useState('');
  const [gfNota2, setGfNota2] = useState('');
  const [gfNota3, setGfNota3] = useState('');
  const [gfFaltas, setGfFaltas] = useState('');
  const [gfMensagem, setGfMensagem] = useState('');
  const [campoErro, setCampoErro] = useState({
    nota1: false,
    nota2: false,
    nota3: false,
    faltas: false,
  });

  const limiteFaltas = 15;
  const mediaMinima = 6;

  // Função para validar o aluno com base nas notas e faltas
  const validarAluno = () => {
    let erro = false;
    let camposErro = {
      nota1: gfNota1 === '',
      nota2: gfNota2 === '',
      nota3: gfNota3 === '',
      faltas: gfFaltas === '',
    };

    // Verificar se pelo menos 2 notas foram preenchidas
    const notasPreenchidas = [gfNota1, gfNota2, gfNota3].filter((nota) => nota !== '').length;
    if (notasPreenchidas < 2) {
      setGfMensagem('Por favor, preencha pelo menos 2 notas.');
      erro = true;
    }

    // Verificar se as faltas foram preenchidas
    if (gfFaltas === '') {
      camposErro.faltas = true;
      erro = true;
      setGfMensagem('Por favor, preencha o campo de faltas.');
    }

    setCampoErro(camposErro);

    if (erro) return;

    let n1 = parseFloat(gfNota1) || 0;
    let n2 = parseFloat(gfNota2) || 0;
    let n3 = parseFloat(gfNota3) || 0;
    let faltas = parseInt(gfFaltas) || 0;

    if (faltas > limiteFaltas) {
      setGfMensagem('Reprovado por falta');
      return;
    }

    let notas = [n1, n2, n3].sort((a, b) => a - b);
    let media = ((notas[1] + notas[2]) / 2).toFixed(2);

    if (media < mediaMinima) {
      setGfMensagem('Reprovado por nota');
    } else {
      setGfMensagem(`Aprovado com média de ${media}`);
    }
  };

  // Função para resetar os campos e a mensagem
  const resetarCampos = () => {
    setGfNota1('');
    setGfNota2('');
    setGfNota3('');
    setGfFaltas('');
    setGfMensagem('');
    setCampoErro({
      nota1: false,
      nota2: false,
      nota3: false,
      faltas: false,
    });
    Keyboard.dismiss();
  };

  // Função para garantir que apenas números entre 0 e 10 sejam digitados, com uma casa decimal
  const handleNotaChange = (value, setState) => {
    let formattedValue = value.replace(/[^0-9.]/g, '');

    // Permite no máximo uma casa decimal
    if ((formattedValue.match(/\./g) || []).length > 1) {
      return;
    }

    // Restringe o valor entre 0 e 10
    if (parseFloat(formattedValue) > 10) {
      formattedValue = '10';
    } else if (parseFloat(formattedValue) < 0) {
      formattedValue = '0';
    }

    setState(formattedValue);
  };

  return (
    <View style={styles.container}>
      {/* Logo FIAP interativo */}
      <TouchableOpacity onPress={resetarCampos}>
        <Image source={require('./assets/fiap-logo.jpg')} style={styles.logo} />
      </TouchableOpacity>

      {/* Campos de entrada */}
      <Text style={styles.label}>Nota 1:</Text>
      <TextInput
        style={[styles.input, campoErro.nota1 && styles.erroInput]}
        keyboardType="numeric"
        value={gfNota1}
        onChangeText={(value) => handleNotaChange(value, setGfNota1)} // Filtragem de entrada
      />

      <Text style={styles.label}>Nota 2:</Text>
      <TextInput
        style={[styles.input, campoErro.nota2 && styles.erroInput]}
        keyboardType="numeric"
        value={gfNota2}
        onChangeText={(value) => handleNotaChange(value, setGfNota2)} // Filtragem de entrada
      />

      <Text style={styles.label}>Nota 3:</Text>
      <TextInput
        style={[styles.input, campoErro.nota3 && styles.erroInput]}
        keyboardType="numeric"
        value={gfNota3}
        onChangeText={(value) => handleNotaChange(value, setGfNota3)} // Filtragem de entrada
      />

      <Text style={styles.label}>Faltas:</Text>
      <TextInput
        style={[styles.input, campoErro.faltas && styles.erroInput]}
        keyboardType="numeric"
        value={gfFaltas}
        onChangeText={(value) => handleNotaChange(value, setGfFaltas)} // Filtragem de entrada
      />

      {/* Botão de validação */}
      <TouchableOpacity style={styles.button} onPress={validarAluno}>
        <Text style={styles.buttonText}>Validar</Text>
      </TouchableOpacity>

      {/* Mensagem de resultado */}
      {gfMensagem !== '' && <Text style={styles.resultado}>{gfMensagem}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  erroInput: {
    borderColor: 'red',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ec145c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});
