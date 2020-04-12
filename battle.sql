DROP PROCEDURE IF EXISTS battleAddVote;
DELIMITER |
CREATE PROCEDURE `battleAddVote`(IN `vote_identificator_in` INT(10), IN `user_evaluator_in` INT(10), IN `user_win_in` INT(10))
BEGIN
    IF (
            (SELECT (EXISTS(SELECT * FROM battle WHERE vote_identificator = vote_identificator_in AND (user_1 = user_win_in OR user_2 = user_win_in) AND user_evaluator = user_evaluator_in)) = 1)
            AND
            (NOT(EXISTS(SELECT * FROM battle, battleWin WHERE battle.vote_identificator = vote_identificator_in AND battle.vote_identificator = battleWin.vote_identificator)))
        )
    THEN BEGIN
        DECLARE user_1_in 	int(10)		UNSIGNED;
        DECLARE user_2_in 	int(10)		UNSIGNED;
        DECLARE user_vip_in TINYINT(1) UNSIGNED;

        #создаем батл
        INSERT INTO battleWin(vote_identificator, user_win) VALUES(vote_identificator_in, user_win_in);

        #обновляем баланс монет пользователя поставившего лайк
        UPDATE users
        SET own_likes =  (SELECT getOwnLikes(user_evaluator_in))
        WHERE id = user_evaluator_in;

        #обновляем количество лайков у пользователя которого лайкнули, и прибавляем к ежеденельному количеству лайков + 1
        UPDATE users
        SET users_likes = (SELECT getUsersLikes(user_win_in)),
            weekly_users_likes = weekly_users_likes + 1
        WHERE id = user_win_in;

        #снимаем монеты если пользователь выиграл и он был в выдаче как вип
        SELECT user_1, user_2, user_vip INTO user_1_in, user_2_in, user_vip_in
        FROM battle
        WHERE vote_identificator = vote_identificator_in;

        UPDATE users
        SET buying_likes = buying_likes - 1
        WHERE id = user_win_in AND ((user_vip_in = 1 AND user_1_in = user_win_in) OR (user_vip_in = 2 AND user_2_in = user_win_in));

        SELECT "OK" as "result";
    END;
    ELSE
        SELECT "WRONG" as "result";
    END IF;
    END
    |
DELIMITER ;


DROP FUNCTION IF EXISTS getOwnLikes;
DELIMITER |
CREATE FUNCTION getOwnLikes(id INT(10)) RETURNS INT(10)
BEGIN
    RETURN (SELECT (
               (SELECT COUNT(*) FROM battleWin, battle WHERE battle.user_evaluator = id AND battle.vote_identificator = battleWin.vote_identificator)
                   -
               (
                   (SELECT COUNT(*)*50 FROM battle, battleWin WHERE battle.vote_identificator = battleWin.vote_identificator AND battleWin.user_win = id AND is_open = 1)
                   +
                   (SELECT COUNT(*)*50 FROM photoLikes WHERE photoLikes.user_id = id AND is_open = 1)
                )
    ));
END
|
DELIMITER ;

DROP FUNCTION IF EXISTS getUsersLikes;
DELIMITER |
CREATE FUNCTION getUsersLikes(id INT(10)) RETURNS INT(10)
BEGIN
    RETURN ((SELECT COUNT(*) FROM `battleWin` WHERE user_win = id) + (SELECT COUNT(*) FROM photoLikes WHERE user_id = id));
END
|
DELIMITER ;
