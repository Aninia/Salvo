package salvo.salvo;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Ship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String type;
    @ElementCollection
    @Column(name = "location")
    private List<String> locations = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gamePlayer_id")
    private GamePlayer gamePlayer;

    public Ship(){
    }

    public Ship(String type, List<String> locations, GamePlayer gamePlayer) {
        this.type = type;
        this.locations = locations;
        this.gamePlayer = gamePlayer;
    }
    //getters & setters


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations (List<String> locations) {
        this.locations = locations;
    }

    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    public long getId() {
        return id;
    }


}//end
