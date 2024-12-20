PGDMP  &                     |         	   CS319_ERP    16.6    16.4 "    6           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            7           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            8           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            9           1262    24593 	   CS319_ERP    DATABASE     w   CREATE DATABASE "CS319_ERP" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE "CS319_ERP";
                avnadmin    false            �            1259    24594    Address    TABLE     �  CREATE TABLE public."Address" (
    "Address_ID" integer NOT NULL,
    "User_ID" integer NOT NULL,
    "Address_1" character varying(255) NOT NULL,
    "Address_2" character varying(255),
    "District" character varying(60) NOT NULL,
    "Sub_District" character varying(60) NOT NULL,
    "Province" character varying(60) NOT NULL,
    "Zip_Code" character varying(5) NOT NULL,
    "Phone" character varying(10) NOT NULL,
    "Is_Default" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Address";
       public         heap    avnadmin    false            �            1259    24600    Address_Address_ID_seq    SEQUENCE     �   ALTER TABLE public."Address" ALTER COLUMN "Address_ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Address_Address_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          avnadmin    false    215            �            1259    24607    Category    TABLE     s   CREATE TABLE public."Category" (
    "Category_ID" integer NOT NULL,
    "Name" character varying(100) NOT NULL
);
    DROP TABLE public."Category";
       public         heap    avnadmin    false            �            1259    32920    Category_Category_ID_seq    SEQUENCE     �   ALTER TABLE public."Category" ALTER COLUMN "Category_ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Category_Category_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1
);
            public          avnadmin    false    217            �            1259    24610    Child_Sub_Category    TABLE     �   CREATE TABLE public."Child_Sub_Category" (
    "Category_ID" integer NOT NULL,
    "Sub_Category_ID" integer NOT NULL,
    "Child_ID" integer NOT NULL,
    "Name" character varying(100) NOT NULL
);
 (   DROP TABLE public."Child_Sub_Category";
       public         heap    avnadmin    false            �            1259    32922    Child_Sub_Category_Child_ID_seq    SEQUENCE     �   ALTER TABLE public."Child_Sub_Category" ALTER COLUMN "Child_ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Child_Sub_Category_Child_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999
    CACHE 1
);
            public          avnadmin    false    218            �            1259    24630    Product    TABLE     �  CREATE TABLE public."Product" (
    "Product_ID" integer NOT NULL,
    "Child_ID" integer NOT NULL,
    "Name" character varying(100),
    "Brand" character varying(100),
    "Description" character varying(255),
    "Unit" character varying(50),
    "Quantity" integer,
    "Sale_Cost" real,
    "Sale_Price" real,
    "Reorder_Point" integer,
    "Visibility" boolean,
    "Review_Rating" integer,
    "Image_URL" character varying(255)
);
    DROP TABLE public."Product";
       public         heap    avnadmin    false            �            1259    24725    Product_Product_ID_seq    SEQUENCE     �   ALTER TABLE public."Product" ALTER COLUMN "Product_ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Product_Product_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          avnadmin    false    219            �            1259    24647    Sub_Category    TABLE     �   CREATE TABLE public."Sub_Category" (
    "Category_ID" integer NOT NULL,
    "Sub_Category_ID" integer NOT NULL,
    "Name" character varying(100) NOT NULL
);
 "   DROP TABLE public."Sub_Category";
       public         heap    avnadmin    false            �            1259    32923     Sub_Category_Sub_Category_ID_seq    SEQUENCE     �   ALTER TABLE public."Sub_Category" ALTER COLUMN "Sub_Category_ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Sub_Category_Sub_Category_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999
    CACHE 1
);
            public          avnadmin    false    220            �            1259    24657    User    TABLE     Y  CREATE TABLE public."User" (
    "User_ID" integer NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Password" character varying(32) NOT NULL,
    "First_Name" character varying(255) NOT NULL,
    "Last_Name" character varying(255) NOT NULL,
    "Phone" character varying(10),
    "Access_Level" "char" DEFAULT '0'::"char" NOT NULL
);
    DROP TABLE public."User";
       public         heap    avnadmin    false            �            1259    24737    User_User_ID_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN "User_ID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_User_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          avnadmin    false    221            (          0    24594    Address 
   TABLE DATA           �   COPY public."Address" ("Address_ID", "User_ID", "Address_1", "Address_2", "District", "Sub_District", "Province", "Zip_Code", "Phone", "Is_Default") FROM stdin;
    public          avnadmin    false    215   �*       *          0    24607    Category 
   TABLE DATA           ;   COPY public."Category" ("Category_ID", "Name") FROM stdin;
    public          avnadmin    false    217   �+       +          0    24610    Child_Sub_Category 
   TABLE DATA           d   COPY public."Child_Sub_Category" ("Category_ID", "Sub_Category_ID", "Child_ID", "Name") FROM stdin;
    public          avnadmin    false    218   �+       ,          0    24630    Product 
   TABLE DATA           �   COPY public."Product" ("Product_ID", "Child_ID", "Name", "Brand", "Description", "Unit", "Quantity", "Sale_Cost", "Sale_Price", "Reorder_Point", "Visibility", "Review_Rating", "Image_URL") FROM stdin;
    public          avnadmin    false    219   &,       -          0    24647    Sub_Category 
   TABLE DATA           R   COPY public."Sub_Category" ("Category_ID", "Sub_Category_ID", "Name") FROM stdin;
    public          avnadmin    false    220   �,       .          0    24657    User 
   TABLE DATA           t   COPY public."User" ("User_ID", "Email", "Password", "First_Name", "Last_Name", "Phone", "Access_Level") FROM stdin;
    public          avnadmin    false    221   �,       :           0    0    Address_Address_ID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Address_Address_ID_seq"', 19, true);
          public          avnadmin    false    216            ;           0    0    Category_Category_ID_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Category_Category_ID_seq"', 62, true);
          public          avnadmin    false    224            <           0    0    Child_Sub_Category_Child_ID_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Child_Sub_Category_Child_ID_seq"', 58, true);
          public          avnadmin    false    225            =           0    0    Product_Product_ID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Product_Product_ID_seq"', 44, true);
          public          avnadmin    false    222            >           0    0     Sub_Category_Sub_Category_ID_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."Sub_Category_Sub_Category_ID_seq"', 59, true);
          public          avnadmin    false    226            ?           0    0    User_User_ID_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."User_User_ID_seq"', 6, true);
          public          avnadmin    false    223            �           2606    24669    Address Address_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("Address_ID", "User_ID");
 B   ALTER TABLE ONLY public."Address" DROP CONSTRAINT "Address_pkey";
       public            avnadmin    false    215    215            �           2606    24675    Category Category_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("Category_ID");
 D   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "Category_pkey";
       public            avnadmin    false    217            �           2606    24677 *   Child_Sub_Category Child_Sub_Category_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Child_Sub_Category"
    ADD CONSTRAINT "Child_Sub_Category_pkey" PRIMARY KEY ("Category_ID", "Sub_Category_ID", "Child_ID");
 X   ALTER TABLE ONLY public."Child_Sub_Category" DROP CONSTRAINT "Child_Sub_Category_pkey";
       public            avnadmin    false    218    218    218            �           2606    24718    Product Product_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("Product_ID");
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            avnadmin    false    219            �           2606    24695    Sub_Category Sub_Category_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public."Sub_Category"
    ADD CONSTRAINT "Sub_Category_pkey" PRIMARY KEY ("Category_ID", "Sub_Category_ID");
 L   ALTER TABLE ONLY public."Sub_Category" DROP CONSTRAINT "Sub_Category_pkey";
       public            avnadmin    false    220    220            �           2606    24699    User User_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("User_ID");
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            avnadmin    false    221            (   )  x�mRmJ�P��9�'��|�.���J!*�l�� �A
�T#���Q�7ϊ�^�cfv�\q���xmzc�4}4]��Mմ3�taz0ݙ�Mߙ~3m����Z�gӍ�+6t�<�UY�Y�\F��T� �W�O���?�>=��!��
�VoA�[�!�y���[�U{�s�̗3(��t�=)���s��B,g~��� �����d�3T��/�\�-#�A=ˠ㉤�����n6�={�Mm����y��$���%6��%Ɇ�!X9��?lN����(����LO      *      x�33�442����� ��      +   "   x�33�4��45�4���2�p,8��b���� N��      ,   �   x���1
1���^@I�I6[ZY؈`�1��`�ւ�Vb'�?����qa�&0<&�@�V�k5i
������r�|M������?�K/m�w�܂��$���u�(�
��"\&���|��|?J�-��v�Ҿ	� �#�-)�!SF�e�c�L-��4r�1�R�1H��      -      x������ � �      .   �   x�3�LL���s��/�M���K���LM4I60610HLL4I�H3M6�40417IK�442��|�c��S�X�`��;f�3���`�B�P�;�X�i`ianfjbld�i�e�Y�Z\�ZDc��L9����8�
��3Δ��|Ҝ
�!P������ �s~?     