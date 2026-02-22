actor {
  public shared ({ caller }) func greet(name : Text) : async Text {
    "Hello, " # name # "! Welcome to Ana's Interior Design Portfolio.";
  };
};
