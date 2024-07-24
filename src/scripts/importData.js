const path = require('path');
const sequelize = require('../../config/database');
const TabelaDados = require('../models/TabelaDados');
const { readExcelFile } = require('../utils/excel');
const { cleanDataSet } = require('../utils/cleanData');

const importData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ force: true });
    console.log('Tabela sincronizada e recriada.');

    const filePath = path.resolve(__dirname, '../../tabela/todas_as_audiências_designadas_para_agosto_new.xlsx');
    const rawData = readExcelFile(filePath);
    const cleanedData = cleanDataSet(rawData);

    // Número de linhas do arquivo excel original
    console.log(`Número de registros limpos: ${cleanedData.length}`);
    console.log(`Inserindo dados na tabela: ${TabelaDados.getTableName()}`);

    /*
      - É o for que de fato impede a entrada de "rows-header"
      - Caso o valor do campo "Data" seja "Data" também, é um cabeçalho e não uma linha.
    */

    for (const item of cleanedData) {
      if (item.Data !== "Data") {
        await TabelaDados.create(item);
      }
    }

    console.log('Dados exportados para a base de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ou inserir dados no banco de dados:', error);
  } finally {
    await sequelize.close();
  }
};

importData();
