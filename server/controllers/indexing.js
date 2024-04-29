import Order from '../models/Order.js'; 

export const addIndexesOnOrder = async (req, res, next) => {
    try {
        const { fieldName } = req.body; 

        if (!fieldName) {
            return res.status(400).json({ message: 'Field name is required.' });
        }

        if (!Order.schema.paths[fieldName]) {
            return res.status(400).json({ message: 'Invalid field name.' });
        }

        await Order.collection.createIndex({ [fieldName]: 1 });

        return res.status(200).json({ message: `Index created on field ${fieldName}` });
    } catch (err) {
        next(err);
    }
};
