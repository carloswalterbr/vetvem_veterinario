// ### JSON ### //
// busca pela ocorrência de 'quem' na chave 'onde' do 'objeto' json e retorna o conteúdo da chave 'oque'
function buscajson(objeto,onde,quem,oque) 
{
	var temp = -1;
	for (i = 0; objeto.length > i; i++) {
		if (objeto[i][onde]==quem) 
			temp = objeto[i][oque];
	}
	return temp;
}
// busca pela ocorrência de 'quem' na chave 'onde' do 'objeto' json e grava o valor fornecido na chave 'oque', retornando a posição
function gravajson(objeto,onde,quem,oque,valor) 
{
	var pos = -1;
	for (i = 0; objeto.length > i; i++) {
		if (objeto[i][onde]==quem) {
			objeto[i][oque] = valor;
			pos = i;
		}
	}
	return pos;
}
// busca pela ocorrência de 'quem' na chave 'onde' do 'objeto' json e retorna a 1ª posição encontrada
function achajson(objeto,onde,quem)
{
	alert(onde+':'+quem);
	var pos = -1;
	for (i = 0; objeto.length > i; i++) {
		alert(objeto[i][onde]);
		if (objeto[i][onde]==quem) {
			pos = i;
		}
	}
	return pos;
}

// ### FORMATAÇÃO MOEDA TELA X BANCO (nn,mm x nn.mm) ### //
// FORMATA MOEDA com vírgula no campo input e ponto na database automaticamente
// use com <input type="tel"> pois number dá erro de formato esperado (do dado)
// no device abre o teclado numerico e o usuário também pode digitar o ponto em vez da vírgula
app.directive('formatamoeda', ['$filter',
function($filter) {
return {
    restrict:'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(data) {
            //convert data from view format to model format

            data=$filter('comma2decimal')(data);

            return data;
        });

        ngModelController.$formatters.push(function(data) {
            //convert data from model format to view format

            data=$filter('decimal2comma')(data);

            return data;
        });
    }
};}]);
app.filter('comma2decimal', [
function() { // should be altered to suit your needs
    return function(input) {
    var ret=(input)?input.toString().trim().replace(",","."):null;
        return parseFloat(ret);
    };
}]);
app.filter('decimal2comma', [
function() {// should be altered to suit your needs
    return function(input) {
        var ret=(input)?input.toString().replace(".",","):null;
        if(ret){
            var decArr=ret.split(",");
            if(decArr.length>1){
                var dec=decArr[1].length;
                if(dec===1){ret+="0";}
            }//this is to show prices like 12,20 and not 12,2
        }
        return ret;
    };
}]);

// ### CHARTS ### //
function bar(valores) {
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
			datasets: [{
				label: 'Faturamento / 12 meses',
				//data: [1200, 1900, 300, 500, 200, 300, 1200, 1900, 300, 500, 200, 300],
				data: valores,
				backgroundColor: [
					/*
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
					*/
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919',
					'#fba919'
				],
				borderColor: [
					/*
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
					*/
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384',
					'#FF6384'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			},
			legend: { display: false }
		}
	});	
}

function pie(valores) {
	var ctx = document.getElementById("myChart2");
	var data = {
    labels: [
        /*
		"Consultas: R$ "+valores[0],
        "Vacinas: R$ "+valores[1],
        "Curativos: R$ "+valores[2],
        "Exames: R$ "+valores[3],
        "Adm.Medicamentos: R$ "+valores[4]
		*/
        "Consultas ",
        "Vacinas ",
        "Curativos ",
        "Exames ",
        "Adm.Medicamentos "
    ],
    datasets: [
        {
            //data: [300, 50, 100, 40, 90],
            data: valores,
            backgroundColor: [
                "#FFCE56",
                "#fba919",
                "#e69900",//"#ff9900",
                "#cc6600",
                "#996600"
            ],
            hoverBackgroundColor: [
                "#FFCE56",
                "#fba919",
                "#ff9900",
                "#ff8000",
                "#cc6600"
            ]
        }]
	};
	var options = {    
		animation:{ animateScale:true},
		responsive: true
	}
	var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: options
});
}
// ,legend: { display: true },tooltips: { enabled: false }







