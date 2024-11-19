import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { useCreateActivityMutation } from '../../generated/graphql';

interface AddActivityModalProps {
    visible: boolean; // Type for visibility prop
    onClose: () => void; // Type for onClose prop (function with no arguments)
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({ visible, onClose }) => {
    const [createActivity] = useCreateActivityMutation();
    const [activityName, setActivityName] = useState<string>(''); // Type for state

    const handleSubmit = async () => {
        try {
            const response = await createActivity({ variables: { name: activityName } });
            console.log(response);
            // Handle success (e.g., show notification, reset field, etc.)
            setActivityName(''); // Reset input field
            onClose(); // Close modal
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show notification)
        }
    };

    return (
        <Modal
            title="Add Activity"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form layout="vertical">
                <Form.Item label="Activity Name">
                    <Input
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                        placeholder="Enter activity name"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit}>
                        Create Activity
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddActivityModal;
