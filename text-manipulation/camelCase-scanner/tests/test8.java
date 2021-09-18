package model.rules;

import model.Colour;
import model.game.State;
import model.grid.Board;
import model.grid.Move;
import model.grid.Square;
import model.pieces.*;
import org.apache.commons.lang3.tuple.Triple;

import java.util.*;


public class ClassicJudge implements IJudge {
    private final Board board;
    private final State state;
    private final CheckValidator checkValidator;

    public ClassicJudge(Board board, State state) {
        this.board = board;
        this.state = state;
        this.checkValidator = new CheckValidator(board, state);
    }

    @Override
    public List<Move> getValidMoves(King king, int x, int y) {
        Set<Square> possiblePositions = new HashSet<>(Arrays.asList(
                new Square(x + 1, y - 1), new Square(x + 1, y), new Square(x + 1, y + 1),
                new Square(x, y - 1), new Square(x, y + 1),
                new Square(x - 1, y - 1), new Square(x - 1, y), new Square(x - 1, y + 1)
        ));
        removeStandardInvalidPositions(possiblePositions, king.colour);

        var pos = new Square(x, y);
        Set<Move> result = Move.createMovesFromSource(pos, king, possiblePositions);
        Set<Move> castlingMoves = getCastlingMoves(king, pos);
        result.addAll(castlingMoves);

        result.removeIf(checkValidator::isKingAttackedAfterAllyMove);

        return new ArrayList<>(result);
    }

    private HashSet<Move> getCastlingMoves(King king, Square pos) {
        var possiblePositions = new HashSet<Square>();
        if (!board.wasKingMoved(king) && !state.isInCheck(king.colour)) {
            Piece pieceToTheLeft = board.getPiece(pos.x, 0);
            if (pieceToTheLeft instanceof Rook && !board.wasRookMoved((Rook) pieceToTheLeft) &&
                    board.areFieldsBetweenEmpty(pos.x, 0, pos.y)) {
                var moveLeft = new Move(pos, new Square(pos.x, pos.y - 1), king);
                if (!checkValidator.isKingAttackedAfterAllyMove(moveLeft)) {
                    possiblePositions.add(new Square(pos.x, pos.y - 2));
                }
            }

            Piece pieceToTheRight = board.getPiece(pos.x, Board.columnsNum - 1);
            if (pieceToTheRight instanceof Rook && !board.wasRookMoved((Rook) pieceToTheRight) &&
                    board.areFieldsBetweenEmpty(pos.x, pos.y, Board.columnsNum - 1)) {
                var moveRight = new Move(pos, new Square(pos.x, pos.y + 1), king);
                if (!checkValidator.isKingAttackedAfterAllyMove(moveRight)) {
                    possiblePositions.add(new Square(pos.x, pos.y + 2));
                }
            }
        }

        var result = Move.createMovesFromSource(pos, king, possiblePositions);
        result.forEach(Move::setCastlingMove);

        return result;
    }

    @Override
    public List<Move> getValidMoves(Queen queen, int x, int y) {
        var movesMaker = new MovesCreator(board, queen.colour, x, y);
        var squares = movesMaker.getVerticalAndHorizontalMoves();
        squares.addAll(movesMaker.getDiagonalMoves());

        var result = Move.createMovesFromSource(new Square(x, y), queen, squares);
        result.removeIf(checkValidator::isKingAttackedAfterAllyMove);

        return new ArrayList<>(result);
    }

    @Override
    public List<Move> getValidMoves(Rook rook, int x, int y) {
        var movesMaker = new MovesCreator(board, rook.colour, x, y);
        var squares = movesMaker.getVerticalAndHorizontalMoves();

        var result = Move.createMovesFromSource(new Square(x, y), rook, squares);
        result.removeIf(checkValidator::isKingAttackedAfterAllyMove);

        return new ArrayList<>(result);
    }

    @Override
    public List<Move> getValidMoves(Bishop bishop, int x, int y) {
        var movesMaker = new MovesCreator(board, bishop.colour, x, y);
        var squares = movesMaker.getDiagonalMoves();

        var result = Move.createMovesFromSource(new Square(x, y), bishop, squares);
        result.removeIf(checkValidator::isKingAttackedAfterAllyMove);

        return new ArrayList<>(result);
    }

    @Override
    public List<Move> getValidMoves(Knight knight, int x, int y) {
        Set<Square> possiblePositions = new HashSet<>(Arrays.asList(
                new Square(x + 2, y - 1), new Square(x + 2, y + 1), // top
                new Square(x + 1, y + 2), new Square(x - 1, y + 2), // right
                new Square(x - 2, y + 1), new Square(x - 2, y - 1), // bottom
                new Square(x - 1, y - 2), new Square(x + 1, y - 2)  // left
        ));

        removeStandardInvalidPositions(possiblePositions, knight.colour);

        var result = Move.createMovesFromSource(new Square(x, y), knight, possiblePositions);
        result.removeIf(checkValidator::isKingAttackedAfterAllyMove);

        return new ArrayList<>(result);
    }

    @Override
    public List<Move> getValidMoves(Pawn pawn, int x, int y) {
        var pos = new Square(x, y);
        var validator = new PawnMoveValidator(board, pawn, pos);

        var result = validator.getValidMoves();
        result.removeIf(checkValidator::isKingAttackedAfterAllyMove);

        return new ArrayList<>(result);
    }

    private void removeStandardInvalidPositions(Set<Square> positions, Colour colour) {
        positions.removeIf(Board::isOutOfBoardPosition);
        positions.removeIf(position -> isSameColourPiece(colour, position));
    }

    private boolean isSameColourPiece(Colour colour, Square position) {
        var piece = board.getPiece(position);
        return piece != null && piece.colour == colour;
    }

    @Override
    public boolean isKingInCheck(Colour kingColour) {
        return checkValidator.isKingInCheck(kingColour);
    }

    @Override
    public boolean areAnyValidMovesForPlayer(Colour playerColour) {
        for (int i = 0; i < Board.rowsNum; ++i) {
            for (int j = 0; j < Board.columnsNum; ++j) {
                var piece = board.getPiece(i, j);
                if (piece != null && piece.colour == playerColour &&
                        !piece.getValidMoves(this, i, j).isEmpty()) {
                    return true;
                }
            }
        }

        return false;
    }

    @Override
    public List<Triple<Class<? extends Piece>, Colour, String>> getInitialPositionsForAllPieces() {
        return PiecesPositionInitializer.getInitialPositions();
    }
}

