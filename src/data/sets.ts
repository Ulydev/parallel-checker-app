import pd1txt from "./sets/pd1.txt"
import pd1artcardtxt from "./sets/pd1artcard.txt"
import pd1cardbacktxt from "./sets/pd1cardback.txt"
import pd1setxt from "./sets/pd1se.txt"
import pd2txt from "./sets/pd2.txt"
import pd2artcardtxt from "./sets/pd2artcard.txt"
import pd2cardbacktxt from "./sets/pd2cardback.txt"
import pd2pltxt from "./sets/pd2pl.txt"
import pd2setxt from "./sets/pd2se.txt"
import ps15txt from "./sets/ps15.txt"
import ps15artcardtxt from "./sets/ps15artcard.txt"
import ps15cardbacktxt from "./sets/ps15cardback.txt"
import ps15setxt from "./sets/ps15se.txt"

export type ParaSet = Set<string>

const parseSet = (setContent: string) => {
    return new Set(setContent.toString().split("\n"))
}

export const sets = {
    // pd1
    pd1: parseSet(pd1txt),
    pd1se: parseSet(pd1setxt),
    pd1artcard: parseSet(pd1artcardtxt),
    pd1cardback: parseSet(pd1cardbacktxt),
    // ps15
    ps15: parseSet(ps15txt),
    ps15se: parseSet(ps15setxt),
    ps15artcard: parseSet(ps15artcardtxt),
    ps15cardback: parseSet(ps15cardbacktxt),
    // pd2
    pd2: parseSet(pd2txt),
    pd2pl: parseSet(pd2pltxt),
    pd2se: parseSet(pd2setxt),
    pd2artcard: parseSet(pd2artcardtxt),
    pd2cardback: parseSet(pd2cardbacktxt)
}
