# WEB_Programmierung-Airhockey-
Spiel für das Fach WEB-Programmierung an der Ostfalia Hochschule für angewandte Wissenschaften

### Gewinn/Spiel
Gewinnen kann der Spieler indem er 10 Tore geschossen hat. Tore schießen, kann er wenn er den Puk in das gegnerische Tor befördert. Dazu darf der Puk gegen alle Banden gestoßen werden. Sollte der Puk in das eigene Tor gestoßen werden, bekommt der Gegner einen Punkt.

### Niederlage
Der Spieler verliert, wenn der Computer 10 Tore geschossen hat.

### Tastatur-/Maus-Kommandos
Das Spiel wird ausschließlich mit der Maus gespielt. Der Cursor der Maus ist gleichzeitig die Position des Spielers.

### Highscore
Der Highscore beinhaltet die 10 besten Spieler. Es wird automatisch geprüft, ob die Zeit Highscorewürdig ist. Für diesen Spieler wird der jeweilige Name plus die Zeit, die er benötigt hat für die 10 Tore, gespeichert.


Programmierhinweise:
- der Highscore wird im JSON Format im Local Storage gepseichert
- alle angezeigten Grafiken, werden im Code gezeichnet
- der Player wird über die Maus gesteuert und somit wird die Position der Maus im Spiel immer abgefragt
- der Computer ist sehr rudimentär implementiert(wie abgesprochen), dieser kann nur hoch und runter fahren
- die Bezugsquellen für die Musik und Bilder haben wir in dem jeweiligen Ordner hinterlegt
- der Timer ist im Format 00:00 programmiert worden
