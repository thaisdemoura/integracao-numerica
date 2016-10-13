var a, b,
	funcao,
	precisao,
	variacao,
	particoes,
	xAtual,
	xProx = 0,
	funcaoAtual,
	funcaoProx,
	area,
	html = '',
	somaAreas 	 = 0,
	somaAnterior = 0,
	iteracoes 	 = math.matrix(),
	$table       = $('.env-tables');


$(document).on('ready', function(){
	integracaoNumerica();
});

function integracaoNumerica() {
	a = -1;
	b = 1;
	particoes = 5;

	do {
		variacao = (b - a) / particoes;
		
		console.info(variacao);

		xAtual = a;
		xProx = 0;

		html += '<div class="env-table">'+
		'<strong class="title">' + particoes + ' partições</strong>'+
		'<table class="process-table">' +
        '<thead>'+
            '<tr>'+
                '<th>'+
                    'n'+        
                '</th>'+
                '<th>'+
                    'xn'+
                '</th>'+
                '<th>'+
                    'xn + 1'+
                '</th>'+
                '<th>'+
                    'ƒ(xn)'+
                '</th>'+
                '<th>'+
                    'ƒ(xn + 1)'+
                '</th>'+
                '<th>'+
                    'Área'+
                '</th>'+
            '</tr>'+
        '</thead>'+
        '<tbody>';
		
		for(i = 1; xProx <= b; i++) {
			xProx = xAtual + variacao;
			
			if(xProx <= b) {
				funcaoAtual = 2 * Math.sqrt(1 - Math.pow(xAtual, 2));
				funcaoProx 	= 2 * Math.sqrt(1 - Math.pow(xProx, 2));

				area = ((funcaoAtual + funcaoProx) / 2) * variacao;


				iteracoes[i] = [i, xAtual, xProx, funcaoAtual, funcaoProx, area];
				somaAreas 	+= area;
				xAtual 		 = xProx;

				html += '<tr>';
				html += '<td>' + i + '</td><td>' + xAtual.toFixed(5) + '</td><td>' + xProx.toFixed(5) + '</td><td>' + funcaoAtual.toFixed(5) + '</td><td>' + funcaoProx.toFixed(5) + '</td><td>' + area.toFixed(5) +'</td>';
				html += '</tr>';
			}
		}

		//console.log(iteracoes);
		console.log('Área: ' + somaAreas);

		precisao = math.abs(somaAreas - somaAnterior);
		console.log('Precisão: ' + precisao);

		html += '</tbody>';
		html += '</table>';

		html += '<div class="info"><span class="precisao"><strong>Precisão:</strong> ' + precisao.toFixed(5) + '</span><span class="soma"><strong>Área Total:</strong> ' + somaAreas.toFixed(5) + '</div>';

		html += '</div>';

		particoes 	*= 2;
		somaAnterior = somaAreas;
		somaAreas 	 = 0;
	} while (precisao > 0.0001);

	$table.append(html);
}
