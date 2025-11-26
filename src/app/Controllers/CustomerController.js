import Customer from "../models/Customer";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Contact from "../models/Contact";


let customers = [
    { id: 1, name: "Dev Samurai", site: "http://ifc.edu.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "UOL", site: "http://uol.com.br" }
];

class CustomerController {
    async index(req, res) {
        const {name,email,status,createdBefore,createdAfter,updatedBefore,updatedAfter, sort} = req.query;

        let where = {};
        let order = [];

        if (name) {
            where = {
                ...where,
                name:{
                    [Op.iLike]: email
                }
            }
        }

        if (status) {
            where = {
                ...where,
                status:{
                    [Op.in]: status.split(",").map(item => item.toUpperCase())
                }
            }
        }
          if (createdBefore) {
            where = {
                ...where,
                createdAt:{
                    [Op.gte]: parseISO(createdBefore)
                }
            }
        }
        if (createdAfter) {
            where = {
                ...where,
                createdAt:{
                    [Op.lte]: parseISO(createdAfter)
                }
            }
        };

         if (updatedBefore) {
            where = {
                ...where,
                updateAt:{
                    [Op.gte]: parseISO(updatedBefore)
                }
            }
        };

        if (updatedAfter) {
            where = {
                ...where,
                updateAt:{
                    [Op.lte]: parseISO(updatedAfter)
                }
            }
        };

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        };

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        const data = await Customer.findAll({
            where,
            order,
            include: [
                {
                model: Contact,
                attributes: ["id"]
            }     
        ],
            limit,
            offset: limit * page - limit
        });
        return res.json(data);
    };

    show(req, res) {
        const id = parseInt(req.params.id)
        const customer = customers.find(item => item.id === id)
        const status = customer ? 200 : 404

        return res.status(status).json(customer)
    }

    create(req, res) {
        const { name, site } = req.body;
        const id = customers[customers.length - 1].id + 1
        const newCustomer = { id, name, site };

        customers.push(newCustomer);
        return res.status(201).json(newCustomer)
    }

    update(req, res) {

        const id = parseInt(req.params.id);
        const { name, site } = req.body;
        const index = customers.findIndex(item => item.id === id)
        const status = index >= 0 ? 200 : 404

        if (index >= 0) {
            customers[index] = { id: parseInt(id), name, site }
        }
        return res.status(status).json(customers[index])

    }

    destroy(req, res) {
        const id = parseInt(req.params.id);
        const index = customers.findIndex(item => item.id === id)
        const status = index >= 0 ? 200 : 404

        if (index >= 0) {
            customers.splice(index, 1);
        }
        return res.status(status).json()

    }
}

export default new CustomerController();
