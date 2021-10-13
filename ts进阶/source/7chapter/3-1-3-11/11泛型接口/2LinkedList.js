"use strict";
exports.__esModule = true;
var Node = /** @class */ (function () {
    function Node(prev, currentvalue, next) {
        this.prev = prev;
        this.currentvalue = currentvalue;
        this.next = next;
    }
    return Node;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.index = 0; // 集合大小
    }
    LinkedList.prototype.has = function (value) {
        throw new Error('Method not implemented.');
    };
    LinkedList.prototype.size = function () {
        return this.index ? this.index : 0;
    };
    LinkedList.prototype.addFirst = function (newValue) {
    };
    LinkedList.prototype.add = function (indexornewvalue, newValue) {
        if (newValue === void 0) { newValue = 0; }
    };
    LinkedList.prototype.checkIndex = function (index) {
        if (index >= this.index) {
            throw new Error("\u63D0\u4F9B\u7684\u7D22\u5F15\u503C\u5927\u4E8E\u5143\u7D20\u4E2A\u6570:\"this.size");
        }
    };
    LinkedList.prototype.get = function (index) {
        var t;
        return t;
    };
    LinkedList.prototype.node = function (index) {
        var t;
        return t;
    };
    LinkedList.prototype.remove = function (indexOrnodeobj) {
        var t;
        return t;
    };
    LinkedList.prototype.unlink = function (nodeRemoved) {
        return nodeRemoved;
    };
    return LinkedList;
}());
exports["default"] = LinkedList;
