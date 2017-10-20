function atualizaCartKit(){

	var precoKit = 0;
	var itemPos = 1;
	var montaSkuKit = "javascript:alert('Por favor, selecione o modelo desejado.');";
	var montaqtd;
	var montaseller;

	$('.kitModule > .kit.addCart').each(function(){

		if($(this).find('.kitseletor-sku').text().length > 0){

			var verifCart = $(this).find('a.buy-in-page-button').attr('href');

			if(verifCart.indexOf('Por favor, selecione o modelo desejado.') === -1){
				var vlrItem = $(this).find('.skuBestPrice').text().replace('R$ ','').replace('.','').replace(',','.').toString();
				precoKit = parseFloat(precoKit) + parseFloat(vlrItem);
				var skuItem = verifCart.split('sku=')[1].split('&qty=')[0];
				var qtd = "&qty=1";
				var seller = "&seller=1";

				if(itemPos === 1){
					montaSkuKit = '?sku=' + skuItem;
					montaqtd = qtd;
					montaseller = seller;
				}

				if(itemPos > 1){
					montaSkuKit = montaSkuKit + '&sku=' + skuItem;
					montaqtd = montaqtd + qtd;
					montaseller = montaseller + seller;
				}
				itemPos++;
			}
		}
	});

	if(montaSkuKit.indexOf("javascript:alert('Por favor, selecione o modelo desejado.');") === -1){
		montaSkuKit = "/checkout/cart/add"+montaSkuKit+montaqtd+montaseller+"&sc=1";
	}

	var parcelaKitNum = $('.prodInfo .skuBestInstallmentNumber').text().replace('x','').toString();
	var parcelaKit = precoKit / parcelaKitNum;
	$('.prodInfo .skuBestPrice').text('R$ ' + precoKit.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, "."));
	$('.prodInfo .skuBestInstallmentValue').text('R$ ' + parcelaKit.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, "."));
	$('.prodInfo .btComprar .buy-button').attr('href',montaSkuKit);
}



$('.compreJunto .resultadoItens .btComprarItens').live('click', function(){

	var montaqtd;
	var montaseller;
	var itemPos = 1;
	var montaSkuKit;

	$('#divCompreJunto .prodItem').each(function(){

		if(!$(this).hasClass('inativo')){
			var skuItem = $(this).find('select').val();
			var qtd = "&qty=1";
			var seller = "&seller=1";

			if(skuItem === '0'){
				alert('Por favor, selecione o modelo desejado.');
				montaSkuKit = 0;
				return false;
			} else {

				if(itemPos === 1){
					montaSkuKit = '?sku=' + skuItem;
					montaqtd = qtd;
					montaseller = seller;
				}

				if(itemPos > 1){
					montaSkuKit = montaSkuKit + '&sku=' + skuItem;
					montaqtd = montaqtd + qtd;
					montaseller = montaseller + seller;
				}
				itemPos++;
			}
		}
	});
	if(montaSkuKit != 0){
		montaSkuKit = "/checkout/cart/add"+montaSkuKit+montaqtd+montaseller+"&sc=1";
		window.location.replace(montaSkuKit);
	}
});


$('.compreJunto .buy-together-content').addClass('vitrine v2 prateleira');
$('.compreJunto .buy-together-content').append('<ul><li></li></ul>');
$($('.vitrine.prateleira li:first-child').html()).appendTo('.compreJunto .buy-together-content ul li');

var imagemPrincipal = $('#image-main').attr('src').replace('-329-329','-489-587').replace('-489-587','-262-315');
var nomePrincipal = $('.productName').text();
var precoPrincipal = $('.skuBestPrice').text();
var parcelaPrincipal = $('.skuBestInstallmentNumber').text();
var parcelaVlrPrincipal = $('.skuBestInstallmentValue').text();
var Idproduto = $('#___rc-p-id').val();

$('.compreJunto li:first-child .price .newPrice + .installment').text('ou '+ parcelaPrincipal +' de ' + parcelaVlrPrincipal);
$('.compreJunto li:first-child .data h3 a').text(nomePrincipal);
$('.compreJunto li:first-child .data .idProduto').text(Idproduto);
$('.compreJunto .buy-together-content ul li:first-child img').attr('src',imagemPrincipal);

function botoes(){
    $('.vitrine.v2 li.prodItem').prepend('<div class="novo"></div><div class="remover"></div>');
}

function atualizaVlr(){
    var totalItens = 0;
    var VlrDivid = 0;
    var itensConta = 0;

    $('.compreJunto li.prodItem .newPrice').each(function(){
        if( !$(this).parent().parent().parent().parent().hasClass('inativo') ){

            var valorLi = $(this).text().split('R$ ')[1].replace('.','').replace(',','.');
            var VlrNum = valorLi.toString();
            totalItens = totalItens.toString()
            totalItens = parseFloat(totalItens) + parseFloat(valorLi);
            VlrDivid = parseFloat(totalItens) / 10;
            itensConta++;
            

            //atuliza sku
            var LiAtual = $(this).parent().parent().parent().parent();
			var Idproduto = LiAtual.find('.data .idProduto').text();

			if(LiAtual.find('#skusSeleciona').length === 0){

				vtexjs.catalog.getProductWithVariations(Idproduto).done(function(product) {

					for (var x = 0; x < product.skus.length; x++) {
						var tamanho = product.skus[x].dimensions.TAMANHO;
						var cor = product.skus[x].dimensions.COR;
						var skus = product.skus[x].sku;
						var disponivel = product.skus[x].available;
						var disabledSKU = "";


						if( LiAtual.find('#skusSeleciona').length === 0 ){
							LiAtual.append('<select name="skusSeleciona" id="skusSeleciona"><option value="0">Selecione</option></select>');
						}

						var nomeOption = tamanho;

						if(cor.length > 0){
							nomeOption = nomeOption + ' - ' + cor;
						}

						if(disponivel === false){
							disabledSKU = "disabled"
						}

						LiAtual.find('#skusSeleciona').append('<option value="'+skus+'" '+disabledSKU+'>'+nomeOption+'</option>');
					}
				});
			}
			//atuliza sku
			
			

        }
       
    });

    var vlrFinal = totalItens.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var DivFinal = "R$ " + VlrDivid.toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    $('.VlrItens .valor').text(vlrFinal);
    $('.VlrItens + .parcela > h3').text(DivFinal);
    $('.quantityItens span').text(itensConta);
}


$.ajax({
  url: "/marinaruybarbosa/busca/?fq=C:1000360",
  success:function(data)
  { 
    //add os itens a uma div escondida
    $('body').append('<div class="listaCombina" style="display: none;"></div>');
    $(".listaCombina").append($(data).find('.prateleira.vitrine').html());  
    //add os itens a uma div escondida


    //cria um index dos itens
    var itemLI = 1;
    $(".listaCombina > .prateleira.vitrine > ul > li").each(function(){

        if($(this).html().length === 0){
            $(this).remove();
        } else {
            $(this).attr('index', itemLI);
            itemLI++;
        }

    });
    //cria um index dos itens
    
    //monta a estrutura
    $('.compreJunto #divCompreJunto > ul').append('<li class="mais"><div></div></li>');
    $('.compreJunto #divCompreJunto > ul').append('<li class="prodItem um"><div></div></li>');
    $('.compreJunto #divCompreJunto > ul').append('<li class="mais"><div></div></li>');
    $('.compreJunto #divCompreJunto > ul').append('<li class="prodItem dois"><div></div></li>');
    $('.compreJunto #divCompreJunto > ul').append('<li class="equal"><div></div></li>');
        
    var liIndex = 1;
    var liIndexAutal = 0;

    $(".listaCombina > .prateleira.vitrine > ul > li").each(function(){
        liIndexAutal = $(this).attr('index');
        if(liIndexAutal == 1){
            $($(this).html()).appendTo('.prodItem.um');
        }
        if(liIndexAutal == 2){
            $($(this).html()).appendTo('.prodItem.dois');
        }
    });
    
    if($('.compreJunto .resultadoItens').length === 0){
        $('.compreJunto').append('<div class="resultadoItens"><div class="quantityItens"><p><span>3</span> produtos</p></div><div class="VlrItens"><h3><span>R$ </span><span class="valor">0,00</span></h3></div><div class="parcela"><small><strong>10x</strong> sem juros de:</small><h3>0,00</h3></div><div class="btComprarItens"></div></div>');
    }
    botoes();
    
    //monta a estrutura
    $('.compreJunto .vitrine.prateleira li:first-child').addClass('prodItem');
    var ultimoItem = $(".listaCombina > .prateleira.vitrine > ul:last-child > li:last-child").attr('index');
    var liClick = 3;
    $('li.prodItem .novo').live('click', function(){
        var liProduto = $(this);

        $(".listaCombina > .prateleira.vitrine > ul > li").each(function(){
            liIndexAutal = $(this).attr('index');
            if(liIndexAutal == liClick){
                liProduto.parent().html('<div class="novo"></div><div class="remover"></div>' + $(this).html());
            }
        });

        if(liClick >= ultimoItem){
            liClick = 3;
        } else {
            liClick++;
        }
        atualizaVlr();
    });

    $('li.prodItem .remover').live('click', function(){
        if($(this).parent().hasClass('inativo')){     
            $(this).parent().removeClass('inativo');
            $(this).prev().show('slow');
            $('li.prodItem .remover').each(function(){
                if( !$(this).parent().hasClass('inativo') ){
                    $(this).show('slow');
                }
            });
        } else {
            $(this).parent().addClass('inativo');
            $(this).prev().hide('slow');

            $('li.prodItem .remover').each(function(){
                if( !$(this).parent().hasClass('inativo') ){
                    $(this).hide('slow');
                }
            });
        }
        atualizaVlr();
    });
    atualizaVlr();
  }
});