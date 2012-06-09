CREATE TABLE Posts (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  titleHtml VARCHAR(255),
  titleMarkup VARCHAR(255),
  contentHtml TEXT,
  contentMarkup TEXT,
  published TINYINT(1),
  deleted TINYINT(1),
  created TIMESTAMP
) ENGINE = InnoDB;
