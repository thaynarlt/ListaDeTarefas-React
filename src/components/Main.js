import React, { Component } from 'react';

import Form from './Form';
import Tarefas from './Tarefas';

import './Main.css'; // Importando o CSS para estilizar o componente

export default class Main extends Component {
	state = {
		// Definindo o estado inicial do componente
		novaTarefa: '', // Variável para armazenar a nova tarefa
		tarefas: [], // Lista de tarefas
		index: -1, // Índice da tarefa selecionada para edição
	};

	componentDidMount() {
		const tarefas = JSON.parse(localStorage.getItem('tarefas')); // Obtém a lista de tarefas do localStorage
		if (!tarefas) return;
		this.setState({ tarefas });
	}

	componentDidUpdate(prevProps, prevState) {
		const { tarefas } = this.state; // Desestrutura o estado para obter a lista de tarefas
		if (tarefas === prevState.tarefas) return;
		localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Armazena a lista de tarefas no localStorage
	}

	handleSubmit = (e) => {
		e.preventDefault(); // Previne o comportamento padrão do formulário
		const { tarefas, index } = this.state; // Desestrutura o estado para obter a lista de tarefas e o índice
		let { novaTarefa } = this.state; // Desestrutura o estado para obter a nova tarefa
		novaTarefa = novaTarefa.trim(); // Remove espaços em branco do início e do fim da string

		// 1. Não permite tarefa vazia
		if (novaTarefa === '') {
			alert('A tarefa não pode ser vazia.');
			return; // Interrompe a execução se a tarefa estiver vazia
		}

		// 2. Lógica para adicionar ou editar
		if (index === -1) {
			// MODO ADIÇÃO (index é -1, indicando que não há tarefa selecionada para edição)

			// Verifica se a tarefa já existe na lista antes de adicionar
			const tarefaJaExisteParaAdicionar = tarefas.some(
				(tarefa) => tarefa.toLowerCase() === novaTarefa.toLowerCase()
			);
			if (tarefaJaExisteParaAdicionar) {
				alert('Essa tarefa já existe na lista!');
				return; // Interrompe se a tarefa já existir
			}

			// Adiciona a nova tarefa ao estado
			this.setState((prevState) => ({
				// Usar prevState é uma boa prática para atualizações baseadas no estado anterior
				tarefas: [...prevState.tarefas, novaTarefa], // Adiciona a nova tarefa à lista existente
				novaTarefa: '', // Limpa o campo de input após a adição
			}));
		} else {
			// MODO EDIÇÃO (index NÃO é -1, indicando que uma tarefa está selecionada para edição)

			// Verifica se o novo nome da tarefa já existe em OUTRA tarefa (excluindo a tarefa atual sendo editada)
			const tarefaJaExisteEmOutroLugar = tarefas.some(
				(tarefa, idx) =>
					tarefa.toLowerCase() === novaTarefa.toLowerCase() && idx !== index
			);
			if (tarefaJaExisteEmOutroLugar) {
				alert('Essa descrição de tarefa já pertence a outra tarefa na lista!');
				return; // Interrompe se a descrição já existir em outra tarefa
			}

			// Atualiza a tarefa existente na lista
			const tarefasAtualizadas = [...tarefas]; // Cria uma cópia da lista de tarefas
			tarefasAtualizadas[index] = novaTarefa; // Atualiza a tarefa no índice especificado com o novo valor

			this.setState({
				tarefas: tarefasAtualizadas, // Define a lista de tarefas com a tarefa atualizada
				novaTarefa: '', // Limpa o campo de input após a edição
				index: -1, // Reseta o índice para -1, indicando que o modo de edição terminou
			});
		}
		// IMPORTANTE: Não há mais chamadas a `this.setState` aqui fora dos blocos if/else
		// que modifiquem `tarefas` ou `novaTarefa`. Isso era a causa do problema original.
	};

	handleChange = (e) => {
		// Método para lidar com a mudança no input
		this.setState({
			// Atualiza o estado com o valor do input
			novaTarefa: e.target.value, // Captura o valor do input
		});
	};

	handleEdit = (e, index) => {
		const { tarefas } = this.state; // Desestrutura o estado para obter a lista de tarefas
		this.setState({
			index, // Define o índice da tarefa selecionada para edição
			novaTarefa: tarefas[index], // Define novaTarefa como a tarefa selecionada para edição
		});
	};

	handleDelete = (e, index) => {
		const { tarefas } = this.state; // Desestrutura o estado para obter a lista de tarefas
		const novasTarefas = [...tarefas]; // Cria uma cópia da lista de tarefas
		novasTarefas.splice(index, 1); // Remove a tarefa selecionada pelo índice
		this.setState({
			// Atualiza o estado com a nova lista de tarefas
			tarefas: [...novasTarefas], // Define a nova lista de tarefas sem a tarefa removida
		});
	};

	render() {
		// Método render para renderizar o componente
		const { novaTarefa, tarefas } = this.state; // Desestrutura o estado para obter novaTarefa

		return (
			<div className="main">
				<h1>Lista de Tarefas</h1>
				<Form
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					novaTarefa={novaTarefa}
				/>
				<Tarefas
					tarefas={tarefas}
					handleEdit={this.handleEdit}
					handleDelete={this.handleDelete}
				/>
			</div>
		);
	}
}
