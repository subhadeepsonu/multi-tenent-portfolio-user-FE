import { useState } from 'react';
import Modal from '../components/Modal';

export default function Dashboard() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <h1>Dashboard Page</h1>
            <button onClick={() => setModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2>Modal Content</h2>
                <p>This is the content inside the modal.</p>
            </Modal>
        </div>
    );
}
