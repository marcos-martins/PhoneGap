
// Funções diversas usadas no projeto


	//Função retorna o parâmetro recebido na URL
    function _GET(nome, urlEntrada){
        if (urlEntrada != null) {
          urlEntrada = urlEntrada.slice(35);
          var url   = urlEntrada.replace("?", "");
          var itens = url.split("&");

          for(n in itens){
              if( itens[n].match(nome) ){
                  return decodeURIComponent(itens[n].replace(nome+"=", ""));
              }
          }
          return null;
        }
    }

    //Voltar para a página principal
    function VoltarIndex(){
        location.href="index.html";
    }    