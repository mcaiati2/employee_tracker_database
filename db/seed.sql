
INSERT INTO users (first_name, last_name, email, manager_id) VALUES 
    ('Bob', 'Smith', 'bob@test.com', null),
    ('Jane', 'Doe', 'jane@test.com', null),
    ('Frank', 'Wilson', 'frank@test.com', 2);

INSERT INTO shops (name, address, user_id) VALUES 
    ('The Bob Smith Winery', '555 wine dr', 1),
    ('Bob Smith Winery Take 2', '1000 wine dr', 1),
    ('Jane Doe Winery', '1500 shop ave', 2);

INSERT INTO wines (brand, type, region, price, shop_id, user_id) VALUES 
    ('Josh', 'Cabernet', 'Napa Valley', 15.00, 1, 1), --1 because 'the bob smith winery' was the first shop inserted into shops.
    ('Chateau Arnauld 2018', 'Bordeaux', 'France', 41.99, 3, 2), --3rd row in the shops table
    ('Domaine de Chevalier 2018', 'Bordeaux', 'France', 94.99, 3, 3);