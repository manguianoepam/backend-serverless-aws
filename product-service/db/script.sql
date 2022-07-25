CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table product (
    id uuid not null default uuid_generate_v4() primary key,
    title text not null,
    description text,
    price integer
);


create table stock (
	product_id uuid references product (id),
    count integer
);