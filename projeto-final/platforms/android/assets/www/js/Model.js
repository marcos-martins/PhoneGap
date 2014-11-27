
    //Variáveis de conexão com banco
    var db;
    var shortName = 'Diario';
    var version = '1.0';
    var displayName = 'Diario';
    var maxSize = 65535;

    //Função responsável por iniciar conexão
    function iniciarBanco(){

     if (!window.openDatabase) {
       alert('Navegador não suporte SQLite.');
       return;
     }

     db = openDatabase(shortName, version, displayName,maxSize);

     db.transaction(function(tx){
       tx.executeSql( 'CREATE TABLE IF NOT EXISTS Anotacoes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, Titulo TEXT NOT NULL, conteudo TEXT NOT NULL, imagem TEXT, published DATE)',
       [],function(){},errorHandler);
              },errorHandler,function(){});

    }

    //Lista os registros existentes no banco de dados
    function ListDBValues() {

      iniciarBanco();

      db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM Anotacoes;', [],
          mostrarRegistros ,errorHandler);
      });

       return;

    }

    //Grava um novo registro no banco de dados
    function gravarBanco(anotacao) {

      iniciarBanco();

    	db.transaction(function(transaction) {
       transaction.executeSql('INSERT INTO Anotacoes(Titulo, conteudo, imagem, published) VALUES (?,?,?,?)',
        [anotacao.titulo, anotacao.conteudo, anotacao.imagem, anotacao.published], function(){}, errorHandler);
       },errorHandler,successCallBack);

    }

    //Callback indica que foi gravado com sucesso
    function successCallBack(){
      alert("Operação realizada com sucesso");
        VoltarIndex();
    }

    //Callback de erro
    function errorHandler(error){
    	alert('Código do erro: ' + error.code);  
    }

    //Função resposável por retornar um registro por id
    function visualizarAnotacao(id){

      db.transaction(function(transaction) {
       transaction.executeSql('SELECT * FROM Anotacoes WHERE id = ?', [id],
         mostrarAnotacao ,errorHandler);
     });

    }