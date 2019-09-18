Vue.component('titulo', {

    template: `
        <div>
            <h1>Campeonato Brasileiro - Série A</h1>
        </div>
    `

});

Vue.component('clube', {
    props : ['time'],
    template: `
        <div>
            <img :src="time.escudo" alt="" class="escudo">
            {{time.nome | ucwords}}
        </div>
    `,

    

});

new Vue({   

    el: "#app",
    data: {
        gols: '3',
        busca : '',
        ordem : {
            colunas : ['pontos', 'gm', 'gs', 'saldo'],
            orientacao : ['desc', 'desc', 'asc', 'desc']
        },
        times : [
            new Time('palmeiras', 'assets/palmeiras_60x60.png'),
            new Time('Internacional', 'assets/internacional_60x60.png'),
            new Time('Flamengo', 'assets/flamengo_60x60.png'),
            new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
            new Time('Santos', 'assets/santos_60x60.png'),
            new Time('Botafogo', 'assets/botafogo_60x60.png'),
            new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
            new Time('Corinthians', 'assets/corinthians_60x60.png'),
            new Time('Grêmio', 'assets/gremio_60x60.png'),
            new Time('Fluminense', 'assets/fluminense_60x60.png'),
            new Time('Bahia', 'assets/bahia_60x60.png'),
            new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
            new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
            new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
            new Time('Sport', 'assets/sport_60x60.png'),
            new Time('Ceará', 'assets/ceara_60x60.png'),
            new Time('Vitória', 'assets/vitoria_60x60.png'),
            new Time('Vasco', 'assets/vasco_60x60.png'),
            new Time('América-MG', 'assets/america_mg_60x60.png'),
            new Time('Paraná', 'assets/parana_60x60.png'),
            
        ],
        novoJogo : {
            casa: {
                time : null,
                gols : 0
            },
            fora: {
                time : null,
                gols : 0
            }
        },
        visao : 'tabela',
    },

    computed : {

        timesLibertadores(){
            return this.times.slice(0, 6);
        },

        timesRebaixados(){
            return this.times.slice(16, 20);
        },

        timesFiltrados(){
            console.log('ordenou', this.ordem);
            var times = _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao);
            var self = this;
            return _.filter(times, function(time){
                var busca = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(busca) >= 0;
            });
        }

    },

    methods : {
        showAlert(){
            alert('Fim de Jogo!');
        },
        pegarValor($event){
            console.log($event);
        },
        criarNovoJogo(){

            var indiceCasa = Math.floor(Math.random() * 20);
            var indiceFora = Math.floor(Math.random() * 20);

            this.novoJogo.casa.time = this.times[indiceCasa];
            this.novoJogo.casa.gols = 0;
            this.novoJogo.fora.time = this.times[indiceFora];
            this.novoJogo.fora.gols = 0;
            console.log(this.novoJogo);
            this.visao = 'placar';

        },

        fimJogo(){

            var golsMarcados = parseInt(this.novoJogo.casa.gols);
            var golsSofridos = parseInt(this.novoJogo.fora.gols);
            var timeAdversario = this.novoJogo.fora.time;
            var timeCasa = this.novoJogo.casa.time;
            timeCasa.fimJogo(timeAdversario, golsMarcados, golsSofridos);
            this.visao = 'tabela';

        },

        ordenar(indice){
          this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc':'desc');
        }
    }, 
    filters : {
        saldo(time){
            return time.gm - time.gs;
        },
        ucwords(valor){
            return valor.charAt(0).toUpperCase() + valor.slice(1);
        }
    }

});