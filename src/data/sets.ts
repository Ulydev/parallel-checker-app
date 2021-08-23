import pd1txt from "./sets/pd1.txt"
import pd1setxt from "./sets/pd1se.txt"
import pd1artcardtxt from "./sets/pd1artcard.txt"
import pd1cardbacktxt from "./sets/pd1cardback.txt"
import ps15txt from "./sets/ps15.txt"
import ps15setxt from "./sets/ps15se.txt"
import ps15artcardtxt from "./sets/ps15artcard.txt"
import ps15cardbacktxt from "./sets/ps15cardback.txt"

export type ParaSet = Set<string>

const parseSet = (setContent: string) => {
    return new Set(setContent.toString().split("\n"))
}

export const sets = {
    pd1: parseSet(pd1txt),
    pd1se: parseSet(pd1setxt),
    pd1artcard: parseSet(pd1artcardtxt),
    pd1cardback: parseSet(pd1cardbacktxt),
    ps15: parseSet(ps15txt),
    ps15se: parseSet(ps15setxt),
    ps15artcard: parseSet(ps15artcardtxt),
    ps15cardback: parseSet(ps15cardbacktxt)
}
