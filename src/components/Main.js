import React, { Component } from 'react';

//Form
import { FaPlus } from 'react-icons/fa';

//Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';

import './Main.css'; // Importando o CSS para estilizar o componente

export default class Main extends Component {
	state = {
		// Definindo o estado inicial do componente
		novaTarefa: '', // Variável para armazenar a nova tarefa
		tarefas: [], // Lista de tarefas
	};

	handleSubmit = (e) => {
		// Método para lidar com o envio do formulário
		e.preventDefault(); // Previne o comportamento padrão do formulário

		const { tarefas } = this.state; // Desestrutura o estado
		let { novaTarefa } = this.state;
		novaTarefa = novaTarefa.trim(); // Remove espaços em branco do início e do fim da string

		if(tarefas.indexOf(novaTarefa) !== -1) {
			// Verifica se a tarefa já existe na lista
			alert('Tarefa já existe!'); // Exibe um alerta se a tarefa já existir
			return; // Interrompe a execução se a tarefa já existir
		}
		const novasTarefas = [...tarefas]; // Cria uma cópia da lista de tarefas
		this.setState({
			// Atualiza o estado com a nova tarefa
			tarefas: [...novasTarefas, novaTarefa], // Adiciona a nova tarefa à lista de tarefas
		});

		// Verifica se novaTarefa não está vazia
		if (!novaTarefa) return; // Se não houver nova tarefa, não faz nada

		this.setState({
			// Atualiza o estado com a nova tarefa
			tarefas: [...tarefas, novaTarefa], // Adiciona a nova tarefa à lista de tarefas
			novaTarefa: '', // Limpa o campo de input
		});
	};

	handleChange = (e) => {
		// Método para lidar com a mudança no input
		this.setState({
			// Atualiza o estado com o valor do input
			novaTarefa: e.target.value, // Captura o valor do input
		});
	};

	render() {
		// Método render para renderizar o componente
		const { novaTarefa, tarefas } = this.state; // Desestrutura o estado para obter novaTarefa

		return (
			<div className="main">
				<h1>Lista de Tarefas</h1>

				<form onSubmit={this.handleSubmit} action="#" className="form">
					<input
						onChange={this.handleChange}
						type="text"
						value={novaTarefa}
					/>
					<button type="submit">
						<FaPlus />
					</button>
				</form>

				<ul className="tarefas">
					{tarefas.map((tarefa) => (
						<li key = {tarefa}>
							{tarefa}
							<span>
								<FaEdit className="edit" />
								<FaWindowClose className="delete" />
							</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
