export class PQueue<T> {
    private array: T[];
    private size: number;
    private compare: (a: T, b: T) => boolean;

    constructor(comparator: (a: T, b: T) => boolean) {        
        this.array = [];
        this.size = 0;        
        this.compare = comparator || PQueue.defaultcomparator;
    }

    private static defaultcomparator<T>(a: T, b: T) {
        return a < b;
    };

    private percolateDown(i: number) {
        var size = this.size;
        var hsize = this.size >>> 1;
        var ai = this.array[i];
        while (i < hsize) {
            let l = (i << 1) + 1;
            const r = l + 1;
            let bestc = this.array[l];
            if (r < size) {
                if (this.compare(this.array[r], bestc)) {
                    l = r;
                    bestc = this.array[r];
                }
            }
            if (!this.compare(bestc, ai)) {
                break;
            }
            this.array[i] = bestc;
            i = l;
        }
        this.array[i] = ai;
    };

    public getComparator(): Function {
        return this.compare;
    }
    
    public enqueue(myval: T) {
        var i = this.size;
        this.array[this.size] = myval;
        this.size += 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            const ap = this.array[p];
            if (!this.compare(myval, ap)) {
                break;
            }
            this.array[i] = ap;
            i = p;
        }
        this.array[i] = myval;
    };

    public dequeue() {
        if (this.size === 0) 
            return undefined;
        var ans = this.array[0];
        if (this.size > 1) {
            this.array[0] = this.array[--this.size];
            this.percolateDown(0 | 0);
        } else {
            this.size -= 1;
        }
        return ans;
    };

    public isEmpty() {
        return this.size === 0;
    };

    public toString() {
        console.log("\nqueue");
        this.array.forEach(e => console.log(e));
    }
}