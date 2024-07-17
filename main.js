const xlsx = require('xlsx');
const { Sequelize, DataTypes } = require('sequelize');

const workbook = xlsx.readFile('./tabela/todas_as_audiências_designadas_para_agosto_new.xlsx');
const sheet_name_list = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);


const cleanData = (item) => {

    
    const dateKey = Object.keys(item).find(key => key.startsWith("Todas as expressões"));
    const dataValue = item[dateKey];

    const sanitizeText = (text) => {
        if (typeof text === 'string') {
            return text.replace(/[\r\n]+/g, '')
        }
        return text;
    };

    return {
        Data: sanitizeText(dataValue),
        Processo: sanitizeText(item['Processo'] || item['__EMPTY']),
        'Orgao_julgador': sanitizeText(item['Órgão_julgador'] || item['__EMPTY_1']),
        Partes: sanitizeText(item['Partes'] || item['__EMPTY_2']),
        Classe: sanitizeText(item['Classe'] || item['__EMPTY_3']),
        'Tipo_de_audi': sanitizeText(item['Tipo_de_audi'] || item['__EMPTY_4']),
        Sala: sanitizeText(item['Sala'] || item['__EMPTY_5']),
        Situacao: sanitizeText(item['Situação'] || item['__EMPTY_6']),
    };
};

const cleanedData = data.map(cleanData);


const sequelize = new Sequelize('xlsx_db', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const TabelaDados = sequelize.define('TabelaDados', {
    Data: DataTypes.TEXT,
    Processo: DataTypes.TEXT,
    'Orgao_julgador': DataTypes.TEXT,
    Partes: DataTypes.TEXT,
    Classe: DataTypes.TEXT,
    'Tipo_de_audi': DataTypes.TEXT,
    Sala: DataTypes.TEXT,
    Situacao: DataTypes.TEXT,
  }, {
    tableName: 'tabela_dados',
    timestamps: false,
  });


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ force: true });
    console.log('Tabela sincronizada e recriada.');

    for (const item of cleanedData) {
        await TabelaDados.create(item);
    }

    console.log('Dados exportados para a base de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ou inserir dados no banco de dados:', error);
  } finally {
    await sequelize.close();
  }
})();
