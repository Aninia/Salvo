package salvo.salvo;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class GamePlayer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn (name = "player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToMany(mappedBy = "gamePlayer", fetch = FetchType.EAGER)
    Set<Ship> ships = new HashSet<>();


    @OneToMany(mappedBy = "gamePlayer", fetch = FetchType.EAGER)
    Set<Salvo> salvoes = new HashSet<>();

    public GamePlayer(){}

    public GamePlayer(Player player, Game game){
        this.player = player;
        this.game= game;
    }
    public Set<Salvo> getSalvoes(){
        return salvoes;
    }


    public long getId() {
        return id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Set<Ship> getShips() {
        return ships;
    }

    public void setShips(Set<Ship> ships) {
        this.ships = ships;
    }


    public void addShip(Ship ship){
        ship.setGamePlayer(this);
        ships.add(ship);
    }

    public Score getScore () {
        return  player.getScores().stream().filter(score -> score.getGame() == game).findFirst().orElse(null);
//        return  player.getScore(game);
    }
}
