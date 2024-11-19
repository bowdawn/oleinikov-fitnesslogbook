import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { useCreateLocationMutation } from '../../generated/graphql';

interface AddLocationModalProps {
    visible: boolean; // Type for visibility prop
    onClose: () => void; // Type for onClose prop (function with no arguments)
}

const AddLocationModal: React.FC<AddLocationModalProps> = ({ visible, onClose }) => {
    const [createLocation] = useCreateLocationMutation();
    const [locationName, setLocationName] = useState<string>(''); // Type for state

    const handleSubmit = async () => {
        try {
            const response = await createLocation({ variables: { name: locationName } });
            console.log(response);
            // Handle success (e.g., show notification, reset field, etc.)
            setLocationName(''); // Reset input field
            onClose(); // Close modal
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show notification)
        }
    };

    return (
        <Modal
            title="Add Location"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form layout="vertical">
                <Form.Item label="Location Name">
                    <Input
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder="Enter location name"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit}>
                        Create Location
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddLocationModal;
