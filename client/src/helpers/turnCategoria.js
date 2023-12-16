

export const turnCategoria = (categoria) => {

  let resp;
  categoria === 'CAFETERIA' && (resp = 'cafeteria');
  categoria === 'UTILES' && (resp = 'utiles');
  categoria === 'CALZADO' && (resp = 'calzado');
  
  return resp;
}
