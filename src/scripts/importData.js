const path = require('path')
const sequelize = require('../../config/database');
const TabelaDados = require('../models/TabelaDados');
const { readExcelFile } = require('../utils/excel');
const { cleanData } = require('../utils/cleanData');

const importData = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco de dados estabelecida com sucesso.");

        await sequelize.sync({ force: true });
        console.log('Tabela sincronizada e recriada.');

        const filePath = path.resolve(__dirname, '../../tabela/todas_as_audiências_designadas_para_agosto_new.xlsx')
        const data = readExcelFile(filePath);

        const cleanedData = data.map(cleanData);

        for (const item of cleanedData) {
            await TabelaDados.create(item);
        }
        console.log("Dados exportados com sucesso.")

    } catch (error) {
        console.error('Erro ao conectar ou inserir dados no banco de dados: ', error);
    } finally {
        await sequelize.close();
    }
}

importData();