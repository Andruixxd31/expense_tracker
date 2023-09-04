CREATE DATABASE expense_tracker;

CREATE TABLE expenses(
    id SERIAL NOT NULL PRIMARY KEY,
    expense VARCHAR(40) NOT NULL,
    cost int NOT NULL,
    category VARCHAR(20)
);


INSERT INTO expenses(expense, cost, category)
VALUES
    ('linea 3', 10, 'transporte publico'),
    ('pizza', 230, 'Restaurante'),
    ('curso tutorial on edge', 200, 'Aprendizaje');

