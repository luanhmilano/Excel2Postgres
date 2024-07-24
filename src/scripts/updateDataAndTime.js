const sequelize = require('../../config/database')
const TabelaDados = require('../models/TabelaDados')
const { Op } = require('sequelize')

const addColumnsIfNotExist = async () => {
    try {
        const result = await sequelize.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'tabela_dados' AND column_name = 'Hora';
        `);

        const existingColumns = result[0].map(row => row.column_name);

        if (!existingColumns.includes('Hora')) {
            await sequelize.query(`ALTER TABLE tabela_dados ADD COLUMN "Hora" TIME;`);
            console.log('Coluna "Hora" adicionada.');
        }

    } catch (error) {
        console.error('Erro ao verificar ou adicionar colunas:', error);
    }
}

const updateDataAndTime = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await addColumnsIfNotExist();

        const records = await TabelaDados.findAll({
            where: {
              Data: {
                [Op.ne]: null
              }
            }
        });


        for (const record of records) {
            const [datePart, timePart] = record.Data.split(' ');
            const [day, month, year] = datePart.split('/');
            const formattedDate = `20${year}-${month}-${day}`;

      
            await TabelaDados.update(
              { Data: formattedDate, Hora: timePart },
              { where: { id: record.id } }
            );
        }

        console.log('Dados atualizados com sucesso!');

    } catch (error) {
        console.error('Erro ao atualizar os dados no banco de dados:', error);
    } finally {
        await sequelize.close();
    }
}

updateDataAndTime();