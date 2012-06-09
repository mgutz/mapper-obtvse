create table Posts (
  id int(11) auto_increment primary key,
  titleHtml varchar(255),
  titleMarkup varchar(255),
  contentHtml text,
  contentMarkup text,
  published tinyint(1),
  deleted tinyint(1),
  created timestamp
) engine = innodb;

create table Comments (
  id int auto_increment primary key,
  postId int references Posts(id),
  comment varchar(140),
  created TIMESTAMP
); -- comments don't need to be in innodb


create table Users (
  id int auto_increment primary key,
  userName varchar(32),
  password varchar(32),
  displayName varchar(128),
  oauthId varchar(32),
  oauthHandle varchar(32),  -- usually the user name but this varies
  oauthProvider char(1),    -- t = twitter
  created timestamp
) engine = innodb;
