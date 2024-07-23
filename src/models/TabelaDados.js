const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TabelaDados = sequelize.define('TabelaDados', {
    Data: DataTypes.TEXT,
    Hora: DataTypes.TIME,
    Processo: DataTypes.TEXT,
    Orgao_julgador: DataTypes.TEXT,
    Partes: DataTypes.TEXT,
    Classe: DataTypes.TEXT,
    Tipo_de_audi: DataTypes.TEXT,
    Sala: DataTypes.TEXT,
    Situacao: DataTypes.TEXT,
}, {
    tableName: 'tabela_dados',
    timestamps: false,
});

module.exports = TabelaDados;