const cleanData = (item) => {
    const dateKey = Object.keys(item).find(key => key.startsWith("Todas as expressões"));
    const dataValue = item[dateKey];

    const sanitizeText = (text) => {
        if (typeof text === 'string') {
            return text.replace(/[\r\n]+/g, '');
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

module.exports = { cleanData };