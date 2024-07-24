/*
    isHeaderRow
    - Não funcionou como eu esperava, mas vou deixar ai, ta atrapalhando ninguém.
*/

const isHeaderRow = (item) => {
    const possibleHeaders = ['Data', 'Processo', 'Órgão julgador', 'Partes', 'Classe', 'Tipo de audiência', 'Sala', 'Situação'];
    return possibleHeaders.every(header => Object.keys(item).includes(header));
};

/*
    cleanData
    - Recebe cada linha do Excel.
    - Corrige quebra de linhas do arquivo original.
    - Encontra o valor do campo que começa com "Todas as expressões", esta é a data/hora.
    - Cria um objeto para cada linha, pegando os valores das colunas EMPTY, e o retorna.
*/
  
const cleanData = (item) => {

    const sanitizeText = (text) => {
      if (typeof text === 'string') {
        return text.replace(/[\r\n]+/g, '');
      }
      return text;
    };

    const dateKey = Object.keys(item).find(key => key.startsWith("Todas as expressões"));
    const dataValue = item[dateKey];
  
    const cleanedItem = {
        Data: sanitizeText(dataValue),
        Processo: sanitizeText(item['Processo'] || item['__EMPTY']),
        'Orgao_julgador': sanitizeText(item['Órgão_julgador'] || item['__EMPTY_1']),
        Partes: sanitizeText(item['Partes'] || item['__EMPTY_2']),
        Classe: sanitizeText(item['Classe'] || item['__EMPTY_3']),
        'Tipo_de_audi': sanitizeText(item['Tipo_de_audi'] || item['__EMPTY_4']),
        Sala: sanitizeText(item['Sala'] || item['__EMPTY_5']),
        Situacao: sanitizeText(item['Situação'] || item['__EMPTY_6']),
    };

    return cleanedItem;
};

/*
    cleanDataSet
    - Recebe o JSON do Excel.
    - Faz um filter que impede a entrada de "row-headers" (mas não funciona).
    - Retorna um array de objetos limpo.
*/
  
const cleanDataSet = (dataSet) => {
    return dataSet
      .filter(item => !isHeaderRow(item))
      .map(cleanData);
};
  
module.exports = { cleanDataSet };
  