# Wood Profitability Module Overview

This document outlines how to build a separate module for managing wood purchases and calculating profitability. The existing repository focuses on the translation extension and does not include these features.

## Suggested Architecture

1. **Backend**
   - Build a REST API using Node.js (Express or NestJS) or a framework of your choice.
   - Store transactions, suppliers and clients in a relational database such as PostgreSQL.
   - Endpoints should allow creating, updating and querying purchase records, freight costs and sales data.

2. **Frontend**
   - Implement a small web interface (React, Vue or Angular) for data entry and dashboards.
   - Provide forms to input quantities, dimensions, purchase prices, sale prices and transportation expenses.

3. **Profit Calculations**
   - Costo total = (purchase price × volume) + freight + any extra charges.
   - Receita = volume sold × selling price per cubic meter.
   - Lucro = receita – custo total.
   - Margem (%) = (lucro / receita) × 100.

4. **Reports**
   - Display tables or charts showing profit per supplier, per shipment and over time.
   - Compare "retirar" and "colocado" pricing to assess freight impact.

This module can live in a new repository separate from Edge Translate to avoid mixing concerns. After deploying the backend and frontend, you can import your spreadsheet data to generate the desired profitability analysis.
