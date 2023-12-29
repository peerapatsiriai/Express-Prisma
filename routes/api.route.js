const routes = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get All User
routes.get('/', async (req, res) => {
    try {

        const allUsers = await prisma.user.findMany();
        res.status(200).json(allUsers);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get User by ID
routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const oneUser = await prisma.user.findMany({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json(oneUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create User
routes.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        
        const newUser = await prisma.user.create({
            data: {
                name: name
            }
        });

        res.status(200).json(newUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User
routes.put('/', async (req, res) => {
    try {
        const { id,name } = req.body;
        
        const updateUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        });

        res.status(200).json(updateUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete User
routes.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        const oneUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        res.status(200).json(oneUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = routes;
