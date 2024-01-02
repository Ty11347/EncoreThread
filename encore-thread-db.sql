PGDMP  *                     |            encore-thread    16.1    16.1 F    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24713    encore-thread    DATABASE     �   CREATE DATABASE "encore-thread" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Simplified)_China.936';
    DROP DATABASE "encore-thread";
                postgres    false            �            1259    24714 	   cartitems    TABLE     �   CREATE TABLE public.cartitems (
    cart_item_id integer NOT NULL,
    cart_id integer,
    product_id integer,
    quantity integer NOT NULL
);
    DROP TABLE public.cartitems;
       public         heap    postgres    false            �            1259    24717    cartitems_cart_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cartitems_cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.cartitems_cart_item_id_seq;
       public          postgres    false    215            �           0    0    cartitems_cart_item_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cartitems_cart_item_id_seq OWNED BY public.cartitems.cart_item_id;
          public          postgres    false    216            �            1259    24718    carts    TABLE     Q   CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    user_id integer
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    24721    carts_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.carts_cart_id_seq;
       public          postgres    false    217            �           0    0    carts_cart_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.carts_cart_id_seq OWNED BY public.carts.cart_id;
          public          postgres    false    218            �            1259    24722    orderdetails    TABLE     �   CREATE TABLE public.orderdetails (
    order_detail_id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);
     DROP TABLE public.orderdetails;
       public         heap    postgres    false            �            1259    24725     orderdetails_order_detail_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orderdetails_order_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.orderdetails_order_detail_id_seq;
       public          postgres    false    219            �           0    0     orderdetails_order_detail_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.orderdetails_order_detail_id_seq OWNED BY public.orderdetails.order_detail_id;
          public          postgres    false    220            �            1259    24726    orders    TABLE     �   CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer,
    order_status character varying(255) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    order_date date NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    24729    orders_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public          postgres    false    221            �           0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public          postgres    false    222            �            1259    24730    products    TABLE     �   CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    size character varying(255),
    quantity integer NOT NULL,
    image_url text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    24735    products_product_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.products_product_id_seq;
       public          postgres    false    223            �           0    0    products_product_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;
          public          postgres    false    224            �            1259    24736    reviews    TABLE     �   CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    product_id integer,
    user_id integer,
    rating integer NOT NULL,
    comment text,
    comment_date date NOT NULL,
    image_data text
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    24741    reviews_review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    225            �           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    226            �            1259    24742    users    TABLE     1  CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    age integer,
    address character varying,
    contact character varying,
    roles character varying,
    password character varying,
    profilepic bytea
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24747    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    227            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.id;
          public          postgres    false    228            �            1259    24813    wishlist    TABLE     y   CREATE TABLE public.wishlist (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL
);
    DROP TABLE public.wishlist;
       public         heap    postgres    false            �            1259    24816    wishlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.wishlist_id_seq;
       public          postgres    false    229            �           0    0    wishlist_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.wishlist_id_seq OWNED BY public.wishlist.id;
          public          postgres    false    230            -           2604    24817    cartitems cart_item_id    DEFAULT     �   ALTER TABLE ONLY public.cartitems ALTER COLUMN cart_item_id SET DEFAULT nextval('public.cartitems_cart_item_id_seq'::regclass);
 E   ALTER TABLE public.cartitems ALTER COLUMN cart_item_id DROP DEFAULT;
       public          postgres    false    216    215            .           2604    24818    carts cart_id    DEFAULT     n   ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.carts_cart_id_seq'::regclass);
 <   ALTER TABLE public.carts ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    218    217            /           2604    24819    orderdetails order_detail_id    DEFAULT     �   ALTER TABLE ONLY public.orderdetails ALTER COLUMN order_detail_id SET DEFAULT nextval('public.orderdetails_order_detail_id_seq'::regclass);
 K   ALTER TABLE public.orderdetails ALTER COLUMN order_detail_id DROP DEFAULT;
       public          postgres    false    220    219            0           2604    24820    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    222    221            1           2604    24821    products product_id    DEFAULT     z   ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);
 B   ALTER TABLE public.products ALTER COLUMN product_id DROP DEFAULT;
       public          postgres    false    224    223            2           2604    24822    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    226    225            3           2604    24754    users id    DEFAULT     i   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            4           2604    24823    wishlist id    DEFAULT     j   ALTER TABLE ONLY public.wishlist ALTER COLUMN id SET DEFAULT nextval('public.wishlist_id_seq'::regclass);
 :   ALTER TABLE public.wishlist ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �          0    24714 	   cartitems 
   TABLE DATA           P   COPY public.cartitems (cart_item_id, cart_id, product_id, quantity) FROM stdin;
    public          postgres    false    215   �P       �          0    24718    carts 
   TABLE DATA           1   COPY public.carts (cart_id, user_id) FROM stdin;
    public          postgres    false    217   #Q       �          0    24722    orderdetails 
   TABLE DATA           ^   COPY public.orderdetails (order_detail_id, order_id, product_id, quantity, price) FROM stdin;
    public          postgres    false    219   HQ       �          0    24726    orders 
   TABLE DATA           Z   COPY public.orders (order_id, user_id, order_status, total_price, order_date) FROM stdin;
    public          postgres    false    221   yQ       �          0    24730    products 
   TABLE DATA           c   COPY public.products (product_id, name, description, price, size, quantity, image_url) FROM stdin;
    public          postgres    false    223   �Q       �          0    24736    reviews 
   TABLE DATA           l   COPY public.reviews (review_id, product_id, user_id, rating, comment, comment_date, image_data) FROM stdin;
    public          postgres    false    225   *R       �          0    24742    users 
   TABLE DATA           h   COPY public.users (id, username, email, age, address, contact, roles, password, profilepic) FROM stdin;
    public          postgres    false    227   �R       �          0    24813    wishlist 
   TABLE DATA           ;   COPY public.wishlist (id, user_id, product_id) FROM stdin;
    public          postgres    false    229   �S       �           0    0    cartitems_cart_item_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cartitems_cart_item_id_seq', 2, true);
          public          postgres    false    216            �           0    0    carts_cart_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.carts_cart_id_seq', 2, true);
          public          postgres    false    218                        0    0     orderdetails_order_detail_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.orderdetails_order_detail_id_seq', 2, true);
          public          postgres    false    220                       0    0    orders_order_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_order_id_seq', 2, true);
          public          postgres    false    222                       0    0    products_product_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.products_product_id_seq', 2, true);
          public          postgres    false    224                       0    0    reviews_review_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.reviews_review_id_seq', 2, true);
          public          postgres    false    226                       0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);
          public          postgres    false    228                       0    0    wishlist_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.wishlist_id_seq', 4, true);
          public          postgres    false    230            6           2606    24756    cartitems cartitems_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_pkey PRIMARY KEY (cart_item_id);
 B   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_pkey;
       public            postgres    false    215            8           2606    24758    carts carts_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    217            :           2606    24760    carts carts_user_id_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_key UNIQUE (user_id);
 A   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_user_id_key;
       public            postgres    false    217            <           2606    24762    orderdetails orderdetails_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (order_detail_id);
 H   ALTER TABLE ONLY public.orderdetails DROP CONSTRAINT orderdetails_pkey;
       public            postgres    false    219            >           2606    24764    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    221            @           2606    24766    products products_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    223            B           2606    24768    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    225            D           2606    24770    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    227            F           2606    24772    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    227            H           2606    24825    wishlist wishlist_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.wishlist DROP CONSTRAINT wishlist_pkey;
       public            postgres    false    229            I           2606    24773     cartitems cartitems_cart_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);
 J   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_cart_id_fkey;
       public          postgres    false    215    4664    217            J           2606    24778 #   cartitems cartitems_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cartitems
    ADD CONSTRAINT cartitems_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 M   ALTER TABLE ONLY public.cartitems DROP CONSTRAINT cartitems_product_id_fkey;
       public          postgres    false    223    4672    215            K           2606    24783    carts carts_user_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_user_id_fkey;
       public          postgres    false    4678    217    227            L           2606    24788 '   orderdetails orderdetails_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 Q   ALTER TABLE ONLY public.orderdetails DROP CONSTRAINT orderdetails_order_id_fkey;
       public          postgres    false    221    219    4670            M           2606    24793 )   orderdetails orderdetails_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 S   ALTER TABLE ONLY public.orderdetails DROP CONSTRAINT orderdetails_product_id_fkey;
       public          postgres    false    4672    219    223            N           2606    24798    orders orders_user_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    221    227    4678            O           2606    24803    reviews reviews_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_product_id_fkey;
       public          postgres    false    225    223    4672            P           2606    24808    reviews reviews_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    227    225    4678            �      x�3�4A.#N0����� )      �      x�3�4�2�4����� ��      �   !   x�3�4B#NC=.#N
@�1z\\\ V��      �   :   x�3�4�H�K��K�460�30�4202�50".#N#���̂���0��W� �e      �   W   x�3�(�O)M.Qp�tI-N.�,(�����8}SS2Ks�<�������Ң��D.#�6'mN�Fm>�E驜�H���b���� ��!�      �   S   x�3�4BSN�����������N##c]C]c�?.#N4�t��OQ(,M��,�D(1)1�*)I-�6K��b���� �(�      �     x����r�@E��9��oY�T&�
������j� �^1Z$M�޹ՙs55��g����1�b�����O|��+�S�xҦ1�<=�4��$D��B `�(/��F��@%��n�KH��̭5V�j�4�q�U��uټʶ�4r��v��~8#���<2K�xJY��Q|1��������i�����lsbB�̷�2����#m�*�W�F{�zǩ���U56��p}Y'݅b�����*��Sk8Ɏ�`܉� \�i�      �      x�3�4�4�2�&\1z\\\ *     