import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import './Tarefas.css'; // Importando o CSS para estilizar o componente

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
	return (
		<ul className="tarefas">
			{tarefas.map((tarefa, index) => (
				<li key={tarefa}>
					{tarefa}
					<span>
						<FaEdit
							onClick={(e) => handleEdit(e, index)}
							className="edit"
						/>

						<FaWindowClose
							onClick={(e) => handleDelete(e, index)}
							className="delete"
						/>
					</span>
				</li>
			))}
		</ul>
	);
}

Tarefas.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	tarefas: PropTypes.array.isRequired,
};
