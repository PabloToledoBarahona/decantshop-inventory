import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que este id coincida con el root de tu proyecto

const AddPerfumeModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = React.useState('');
  const [totalMl, setTotalMl] = React.useState('');
  const [remainingMl, setRemainingMl] = React.useState('');
  const [status, setStatus] = React.useState('Disponible');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, total_ml: parseInt(totalMl), remaining_ml: parseInt(remainingMl), status });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Perfume"
      className="bg-white p-8 rounded-lg max-w-lg mx-auto border shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Agregar Perfume</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Total ML</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={totalMl}
            onChange={(e) => setTotalMl(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ML Restantes</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={remainingMl}
            onChange={(e) => setRemainingMl(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Disponible">Disponible</option>
            <option value="Agotado">Agotado</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPerfumeModal;