# Planilha de Logística de Madeira

Este guia explica como criar uma planilha no Google Sheets para controlar fornecedores de madeira, fretes e simular o melhor negócio. Acompanham um modelo em CSV (`wood_logistics_template.csv`) e um script de automação (`wood_logistics_script.gs`).

## Estrutura Recomendada
Crie abas (planilhas internas) com os seguintes nomes e colunas principais:

1. **CadastroFornecedores**
   - `Fornecedor`
   - `Cidade`
   - `Estado`
   - `MadeiraSecaPreco` (R$/m³)
   - `MadeiraVerdePreco` (R$/m³)
   - `CondicaoPagamento`
   - `Espessura`
   - `Largura`

2. **Caminhoes**
   - `Modelo`
   - `Tipo` (SEB, TREM, CLS…)
   - `PrecoTonelada`
   - `CapacidadeTon`
   - `FretePorKM`

3. **Distancias**
   - `Origem`
   - `Destino`
   - `DistanceKM` (preenchida automaticamente)
   - `EstimatedDurationH` (preenchida automaticamente)

4. **SimulacaoInteligente**
   - Preencha `CidadeCliente`, `FornecedorDesejado` (opcional), `QuantidadeM3`.
   - Use fórmulas para buscar preços, distância e frete e calcular o custo total.
   - Classifique automaticamente para mostrar a opção mais barata.

## Automatização
1. Importe `wood_logistics_template.csv` para criar a estrutura inicial das abas.
2. Abra **Extensões → Apps Script** e cole o código de `wood_logistics_script.gs`. Substitua `YOUR_GOOGLE_MAPS_API_KEY` por sua chave da API do Google Maps.
3. Execute a função `updateLogistics` para preencher `DistanceKM` e `EstimatedDurationH` na aba `Distancias`.
4. Configure um acionador (gatilho) diário para atualizar automaticamente as distâncias e durações.

## Como Usar
1. Cadastre todos os fornecedores e caminhões nas respectivas abas.
2. Informe as rotas na aba `Distancias`.
3. Utilize a aba `SimulacaoInteligente` para inserir o destino do cliente e a quantidade desejada. As fórmulas irão recuperar automaticamente preços, calcular o frete (distância × frete por km × capacidade) e indicar o fornecedor e caminhão com menor custo total.
4. Consulte a aba `LogSimulacoes` (caso deseje registrar histórico) para salvar cada simulação.

Com essas etapas você terá uma planilha dinâmica capaz de analisar múltiplos fornecedores e identificar o melhor negócio considerando preço da madeira, frete e condições de pagamento.

## Exemplo de Cálculos
Essas fórmulas auxiliam na composição dos custos e podem ser incluídas em colunas próprias:
- `PrecoMadeiraTotal = PrecoPorM3 × QuantidadeM3`
- `FreteTotal = DistanceKM × FretePorKM × QuantidadeTon`
- `PrecoPorM3 = PrecoMadeiraTotal / QuantidadeM3`

Apresente cada um desses valores separadamente na aba `SimulacaoInteligente` para facilitar a comparação entre cenários.
